using ContraCostco;

namespace ContraCostco
{



    public class Product
    {
        public string? ProductName { get; set; }
        public string? ProductDescription { get; set; }
        public string ProductImageURL { get; set; }
        public string ProductPrice { get; set; }
        public List<string> ProductCategories { get; set; } // Changed to List<string>
        public List<string> ProductFeatures { get; set; } // Changed to List<string>
        public List<string> ProductReviews { get; set; } // Changed to List<string>
        public List<string> ProductUseCases { get; set; } // Changed to List<string>
        public List<string> ProductTags { get; set; } // Changed to List<string>

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
