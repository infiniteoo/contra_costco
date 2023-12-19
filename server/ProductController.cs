using Microsoft.AspNetCore.Mvc;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace ContraCostco.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IDynamoDBContext _context;

        public ProductsController(IDynamoDBContext context)
        {
            _context = context;
        }

        /* // GET: api/products
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var products = await _context.ScanAsync<Product>(new List<ScanCondition>()).GetRemainingAsync();
            return Ok(products);
        } */
        // GET: api/products
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var products = await _context.ScanAsync<Product>(new List<ScanCondition>()).GetRemainingAsync();
                return Ok(products);
            }
            catch (Exception ex)
            {
                // Log the exception details here as needed
                return StatusCode(500, $"Error accessing DynamoDB: {ex.Message}");
            }
        }
        // GET: api/products/1
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            var product = await _context.LoadAsync<Product>(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        // POST: api/products
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Product product)
        {
            await _context.SaveAsync(product);
            return CreatedAtAction(nameof(Get), new { id = product.ProductName }, product);
        }

        // PUT: api/products/1
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody] Product updatedProduct)
        {
            var product = await _context.LoadAsync<Product>(id);
            if (product == null)
            {
                return NotFound();
            }

            product.ProductName = updatedProduct.ProductName;
            product.ProductPrice = updatedProduct.ProductPrice;

            await _context.SaveAsync(product);
            return NoContent();
        }

        // DELETE: api/products/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var product = await _context.LoadAsync<Product>(id);
            if (product == null)
            {
                return NotFound();
            }

            await _context.DeleteAsync(product);
            return NoContent();
        }
    }
}
