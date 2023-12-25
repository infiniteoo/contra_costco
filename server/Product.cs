using Amazon.DynamoDBv2.DataModel;
using System.Collections.Generic;

namespace ContraCostco
{
    [DynamoDBTable("contra_costco")]
    public class Product
    {
        [DynamoDBHashKey("product_name")] // Adjusted for DynamoDB's attribute name
        public string ProductName { get; set; }

        [DynamoDBProperty("product_description")]
        public string ProductDescription { get; set; }

        [DynamoDBProperty("product_image_url")]
        public string ProductImageURL { get; set; }

        [DynamoDBProperty("product_price")]
        public string ProductPrice { get; set; }

        [DynamoDBProperty("product_categories")]
        public List<string> ProductCategories { get; set; }

        [DynamoDBProperty("product_rating")]
        public string ProductRating { get; set; }

        [DynamoDBProperty("product_features")]
        public List<string> ProductFeatures { get; set; }

        [DynamoDBProperty("product_reviews")]
        public List<string> ProductReviews { get; set; }

        [DynamoDBProperty("product_use_cases")]
        public List<string> ProductUseCases { get; set; }

        [DynamoDBProperty("product_tags")]
        public List<string> ProductTags { get; set; }

        public Product()
        {
            ProductName = string.Empty;
            ProductDescription = string.Empty;
            ProductImageURL = string.Empty;
            ProductPrice = string.Empty;
            ProductRating = string.Empty;
            ProductCategories = new List<string>();
            ProductFeatures = new List<string>();
            ProductReviews = new List<string>();
            ProductUseCases = new List<string>();
            ProductTags = new List<string>();
        }
    }
}
