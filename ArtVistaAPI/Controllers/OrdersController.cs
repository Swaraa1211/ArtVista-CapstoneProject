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
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public OrdersController(ApplicationDBContext context)
        {
            _context = context;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrdersModel>>> GetOrdersModel()
        {
            return await _context.Orders.ToListAsync();
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrdersModel>> GetOrdersModel(int id)
        {
            var ordersModel = await _context.Orders.FindAsync(id);

            if (ordersModel == null)
            {
                return NotFound();
            }

            return ordersModel;
        }

        // PUT: api/Orders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrdersModel(int id, OrdersModel ordersModel)
        {
            if (id != ordersModel.order_id)
            {
                return BadRequest();
            }

            _context.Entry(ordersModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrdersModelExists(id))
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

        // POST: api/Orders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<OrdersModel>> PostOrdersModel(OrdersModel ordersModel)
        {
            _context.Orders.Add(ordersModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrdersModel", new { id = ordersModel.order_id }, ordersModel);
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrdersModel(int id)
        {
            var ordersModel = await _context.Orders.FindAsync(id);
            if (ordersModel == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(ordersModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrdersModelExists(int id)
        {
            return _context.Orders.Any(e => e.order_id == id);
        }
    }
}
