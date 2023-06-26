using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ArtVistaAPI.Data;
using ArtVistaAPI.Models;

namespace ArtVistaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public CartController(ApplicationDBContext context)
        {
            _context = context;
        }

        // GET: api/Cart
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CartModel>>> GetCartModel()
        {
            return await _context.Cart.ToListAsync();
        }

        // GET: api/Cart/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CartModel>> GetCartModel(int id)
        {
            var cartModel = await _context.Cart.FindAsync(id);

            if (cartModel == null)
            {
                return NotFound();
            }

            return cartModel;
        }

        // PUT: api/Cart/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCartModel(int id, CartModel cartModel)
        {
            if (id != cartModel.cart_id)
            {
                return BadRequest();
            }

            _context.Entry(cartModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Cart
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CartModel>> PostCartModel(CartModel cartModel)
        {
            _context.Cart.Add(cartModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCartModel", new { id = cartModel.cart_id }, cartModel);
        }

        // DELETE: api/Cart/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCartModel(int id)
        {
            var cartModel = await _context.Cart.FindAsync(id);
            if (cartModel == null)
            {
                return NotFound();
            }

            _context.Cart.Remove(cartModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CartModelExists(int id)
        {
            return _context.Cart.Any(e => e.cart_id == id);
        }
    }
}
