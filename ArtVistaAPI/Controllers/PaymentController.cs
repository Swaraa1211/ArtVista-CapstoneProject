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
    public class PaymentController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public PaymentController(ApplicationDBContext context)
        {
            _context = context;
        }

        // GET: api/Payment
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PaymentModel>>> GetPaymentModel()
        {
            return await _context.Payment.ToListAsync();
        }

        // GET: api/Payment/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PaymentModel>> GetPaymentModel(int id)
        {
            var paymentModel = await _context.Payment.FindAsync(id);

            if (paymentModel == null)
            {
                return NotFound();
            }

            return paymentModel;
        }

        // PUT: api/Payment/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPaymentModel(int id, PaymentModel paymentModel)
        {
            if (id != paymentModel.payment_id)
            {
                return BadRequest();
            }

            _context.Entry(paymentModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaymentModelExists(id))
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

        // POST: api/Payment
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PaymentModel>> PostPaymentModel(PaymentModel paymentModel)
        {
            _context.Payment.Add(paymentModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPaymentModel", new { id = paymentModel.payment_id }, paymentModel);
        }

        // DELETE: api/Payment/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePaymentModel(int id)
        {
            var paymentModel = await _context.Payment.FindAsync(id);
            if (paymentModel == null)
            {
                return NotFound();
            }

            _context.Payment.Remove(paymentModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PaymentModelExists(int id)
        {
            return _context.Payment.Any(e => e.payment_id == id);
        }
    }
}
