

using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2.DocumentModel;
using Amazon.S3;
using Amazon.S3.Model;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Threading.Tasks;
using Amazon.DynamoDBv2.Model;
using ContraCostco;


class Program
{
    static readonly HttpClient httpClient = new HttpClient();
    static readonly string openaiApiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY") ?? "default_value";
    static readonly string bucketName = "contra-costco";
    static readonly AmazonDynamoDBClient dynamoDBClient = new AmazonDynamoDBClient();
    static readonly AmazonS3Client s3Client = new AmazonS3Client();
    static readonly DynamoDBContext context = new DynamoDBContext(dynamoDBClient);

    static async Task Main(string[] args)
    {
        // InsertItem(); // Uncomment to run the item insertion method
        await GenerateImages();
        Console.WriteLine("All items processed successfully.");
    }

    static async Task GenerateImages()
    {
        var scanConditions = new List<ScanCondition>();
        var search = context.ScanAsync<ContraCostco.Product>(scanConditions);


        while (!search.IsDone)
        {
            var items = await search.GetNextSetAsync();
            foreach (var item in items)
            {
                try
                {
                    string prompt = $"Please create an image of a product for a comical parody store called Contra Costco. Based on the 80's arcade game Contra, this e-commerce grocery store exclusively sells over-the-top, comical items that an 80's jungle freedom fighter would need. Please make the image colorful, friendly, fun, bright, silly, comical, and have a transparent background.\nProduct Name: {item.ProductName}\nProduct Description: {item.ProductDescription}\nProduct Features: {string.Join(", ", item.ProductFeatures)}\nProduct Reviews: {string.Join(", ", item.ProductReviews)}\nProduct Use Cases: {string.Join(", ", item.ProductUseCases)}\nProduct Tags: {string.Join(", ", item.ProductTags)}\nProduct Categories: {string.Join(", ", item.ProductCategories)}";


                    Console.WriteLine($"Prompt: {prompt}");

                    // Generate image using OpenAI API
                    var openaiResponse = await CallOpenAIAPI(prompt);
                    var imageUrl = openaiResponse?.Data[0]?.Url;

                    if (!string.IsNullOrEmpty(imageUrl))
                    {
                        // Download and upload image to S3
                        var imageKey = $"contra-costco/{item.ProductName}.png";
                        await UploadImageToS3(imageUrl, imageKey);

                        if (!string.IsNullOrEmpty(item.ProductName))
                        {
                            var s3ImageUrl = $"https://{bucketName}.s3.amazonaws.com/{imageKey}";
                            await UpdateItemInDynamoDB(item.ProductName, s3ImageUrl);
                        }
                        else
                        {
                            Console.WriteLine("Warning: ProductName is null or empty.");
                        }
                    }
                }
                catch (Exception e)
                {
                    Console.WriteLine($"Error processing item {item.ProductName}: {e.Message}");
                }
            }
        }

        static async Task<OpenAIResponse?> CallOpenAIAPI(string prompt)
        {
            var requestContent = new { model = "dall-e-3", prompt = prompt, size = "1024x1024", quality = "standard", n = 1 };
            var content = new StringContent(JsonSerializer.Serialize(requestContent), System.Text.Encoding.UTF8, "application/json");
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", openaiApiKey);

            var response = await httpClient.PostAsync("https://api.openai.com/v1/images/generate", content);
            if (response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadAsStringAsync();
                return JsonSerializer.Deserialize<OpenAIResponse>(responseContent);
            }
            return null;
        }

        static async Task UploadImageToS3(string imageUrl, string imageKey)
        {
            var imageResponse = await httpClient.GetAsync(imageUrl);
            if (imageResponse.IsSuccessStatusCode)
            {
                var imageStream = await imageResponse.Content.ReadAsStreamAsync();
                var putRequest = new PutObjectRequest
                {
                    BucketName = bucketName,
                    Key = imageKey,
                    InputStream = imageStream
                };
                await s3Client.PutObjectAsync(putRequest);
            }
        }

        static async Task UpdateItemInDynamoDB(string productName, string imageUrl)
        {
            var updateRequest = new UpdateItemRequest
            {
                TableName = "contra_costco",
                Key = new Dictionary<string, AttributeValue> { { "product_name", new AttributeValue { S = productName } } },
                UpdateExpression = "SET product_image_url = :val1",
                ExpressionAttributeValues = new Dictionary<string, AttributeValue> { { ":val1", new AttributeValue { S = imageUrl } } }
            };
            await dynamoDBClient.UpdateItemAsync(updateRequest);
        }
    }



    public class OpenAIResponse
    {
        // Define properties according to the response structure of OpenAI API
        public List<OpenAIData> Data { get; set; } = new List<OpenAIData>();
    }

    public class OpenAIData
    {
        public string Url { get; set; } = new string("");
        // ... Other properties
    }
}

