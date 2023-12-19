using Microsoft.AspNetCore.Mvc;

[Route("api/products")]
[ApiController]
public class ProductsController : ControllerBase
{
    private readonly List<Product> _products = new List<Product>
    {
        new() { Id = 1, Name = "Product 1", Price = 10.99m, CreatedAt = DateTime.Now },
        new() { Id = 2, Name = "Product 2", Price = 15.49m, CreatedAt = DateTime.Now },
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
    public IActionResult Get(int id)
    {
        var product = _products.Find(p => p.Id == id);
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
        product.Id = _products.Count + 1;
        product.CreatedAt = DateTime.Now;
        _products.Add(product);
        return CreatedAtAction(nameof(Get), new { id = product.Id }, product);
    }

    // PUT: api/products/1
    [HttpPut("{id}")]
    public IActionResult Put(int id, [FromBody] Product updatedProduct)
    {
        var product = _products.Find(p => p.Id == id);
        if (product == null)
        {
            return NotFound();
        }

        product.Name = updatedProduct.Name;
        product.Price = updatedProduct.Price;

        return NoContent();
    }

    // DELETE: api/products/1
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var product = _products.Find(p => p.Id == id);
        if (product == null)
        {
            return NotFound();
        }

        _products.Remove(product);
        return NoContent();
    }
}
