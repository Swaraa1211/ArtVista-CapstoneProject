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
    public class OrderItemController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public OrderItemController(ApplicationDBContext context)
        {
            _context = context;
        }

        // GET: api/OrderItem
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderItemModel>>> GetOrderItemModel()
        {
            return await _context.OrderItem.ToListAsync();
        }

        // GET: api/OrderItem/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderItemModel>> GetOrderItemModel(int id)
        {
            var orderItemModel = await _context.OrderItem.FindAsync(id);

            if (orderItemModel == null)
            {
                return NotFound();
            }

            return orderItemModel;
        }

        // PUT: api/OrderItem/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrderItemModel(int id, OrderItemModel orderItemModel)
        {
            if (id != orderItemModel.orderitem_id)
            {
                return BadRequest();
            }

            _context.Entry(orderItemModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderItemModelExists(id))
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

        // POST: api/OrderItem
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<OrderItemModel>> PostOrderItemModel(OrderItemModel orderItemModel)
        {
            _context.OrderItem.Add(orderItemModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrderItemModel", new { id = orderItemModel.orderitem_id }, orderItemModel);
        }

        // DELETE: api/OrderItem/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrderItemModel(int id)
        {
            var orderItemModel = await _context.OrderItem.FindAsync(id);
            if (orderItemModel == null)
            {
                return NotFound();
            }

            _context.OrderItem.Remove(orderItemModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderItemModelExists(int id)
        {
            return _context.OrderItem.Any(e => e.orderitem_id == id);
        }
    }
}
