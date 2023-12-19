using Microsoft.AspNetCore.Mvc;
using ContraCostco;

[Route("api/products")]
[ApiController]
public class ProductsController : ControllerBase
{
    private readonly List<Product> _products = new List<Product>
    {
        new() { ProductName = "Product 1", ProductPrice = "10.99",  },
        new() { ProductName = "Product 2", ProductPrice = "15.49",  },
        // Add more initial products as needed
    };

    // GET: api/products
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_products);
    }

    // GET: api/products/1
    [HttpGet("{id}")]
    public IActionResult Get(string id)
    {
        var product = _products.Find(p => p.ProductName == id);
        if (product == null)
        {
            return NotFound();
        }
        return Ok(product);
    }

    // POST: api/products
    [HttpPost]
    public IActionResult Post([FromBody] Product product)
    {


        _products.Add(product);
        return CreatedAtAction(nameof(Get), new { id = product.ProductName }, product);
    }

    // PUT: api/products/1
    [HttpPut("{id}")]
    public IActionResult Put(string id, [FromBody] Product updatedProduct)
    {
        var product = _products.Find(p => p.ProductName == id);
        if (product == null)
        {
            return NotFound();
        }

        product.ProductName = updatedProduct.ProductName;
        product.ProductPrice = updatedProduct.ProductPrice;

        return NoContent();
    }

    // DELETE: api/products/1
    [HttpDelete("{id}")]
    public IActionResult Delete(string id)
    {
        var product = _products.Find(p => p.ProductName == id);
        if (product == null)
        {
            return NotFound();
        }

        _products.Remove(product);
        return NoContent();
    }
}
