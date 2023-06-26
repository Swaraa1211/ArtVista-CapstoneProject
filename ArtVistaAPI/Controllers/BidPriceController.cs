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
    public class BidPriceController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public BidPriceController(ApplicationDBContext context)
        {
            _context = context;
        }

        // GET: api/BidPrice
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BidPriceModel>>> GetBidPriceModel()
        {
            return await _context.BidPrice.ToListAsync();
        }

        // GET: api/BidPrice/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BidPriceModel>> GetBidPriceModel(int id)
        {
            var bidPriceModel = await _context.BidPrice.FindAsync(id);

            if (bidPriceModel == null)
            {
                return NotFound();
            }

            return bidPriceModel;
        }

        // PUT: api/BidPrice/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBidPriceModel(int id, BidPriceModel bidPriceModel)
        {
            if (id != bidPriceModel.bidprice_id)
            {
                return BadRequest();
            }

            _context.Entry(bidPriceModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BidPriceModelExists(id))
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

        // POST: api/BidPrice
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BidPriceModel>> PostBidPriceModel(BidPriceModel bidPriceModel)
        {
            _context.BidPrice.Add(bidPriceModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBidPriceModel", new { id = bidPriceModel.bidprice_id }, bidPriceModel);
        }

        // DELETE: api/BidPrice/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBidPriceModel(int id)
        {
            var bidPriceModel = await _context.BidPrice.FindAsync(id);
            if (bidPriceModel == null)
            {
                return NotFound();
            }

            _context.BidPrice.Remove(bidPriceModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BidPriceModelExists(int id)
        {
            return _context.BidPrice.Any(e => e.bidprice_id == id);
        }
    }
}
