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
    public class BidArtController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public BidArtController(ApplicationDBContext context)
        {
            _context = context;
        }

        // GET: api/BidArt
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BidArtModel>>> GetBidArtModel()
        {
            return await _context.BidArt.ToListAsync();
        }

        // GET: api/BidArt/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BidArtModel>> GetBidArtModel(int id)
        {
            var bidArtModel = await _context.BidArt.FindAsync(id);

            if (bidArtModel == null)
            {
                return NotFound();
            }

            return bidArtModel;
        }

        // PUT: api/BidArt/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBidArtModel(int id, BidArtModel bidArtModel)
        {
            if (id != bidArtModel.BidArt_id)
            {
                return BadRequest();
            }

            _context.Entry(bidArtModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BidArtModelExists(id))
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

        // POST: api/BidArt
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BidArtModel>> PostBidArtModel(BidArtModel bidArtModel)
        {
            _context.BidArt.Add(bidArtModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBidArtModel", new { id = bidArtModel.BidArt_id }, bidArtModel);
        }

        // DELETE: api/BidArt/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBidArtModel(int id)
        {
            var bidArtModel = await _context.BidArt.FindAsync(id);
            if (bidArtModel == null)
            {
                return NotFound();
            }

            _context.BidArt.Remove(bidArtModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BidArtModelExists(int id)
        {
            return _context.BidArt.Any(e => e.BidArt_id == id);
        }
    }
}
