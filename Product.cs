
namespace ContraCostco
{



    public class Product
    {
        // Define properties according to your DynamoDB table's schema
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }

        public string ProductImageURL { get; set; }

        public string ProductPrice { get; set; }

        public List<string> ProductCategories { get; set; }
        public List<string> ProductFeatures { get; set; }
        public List<string> ProductReviews { get; set; }
        public List<string> ProductUseCases { get; set; }
        public List<string> ProductTags { get; set; }


        public Product()
        {
            ProductName = string.Empty;
            ProductDescription = string.Empty;
            ProductImageURL = string.Empty;
            ProductPrice = string.Empty;
            ProductCategories = new List<string>();
            ProductFeatures = new List<string>();
            ProductReviews = new List<string>();
            ProductUseCases = new List<string>();
            ProductTags = new List<string>();




        }



    }
}


