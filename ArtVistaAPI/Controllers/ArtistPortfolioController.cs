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
    public class ArtistPortfolioController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public ArtistPortfolioController(ApplicationDBContext context)
        {
            _context = context;
        }

        // GET: api/ArtistPortfolio
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ArtistPortfolioModel>>> GetArtistPortfolioModel()
        {
            return await _context.ArtistPortfolio.ToListAsync();
        }

        // GET: api/ArtistPortfolio/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ArtistPortfolioModel>> GetArtistPortfolioModel(int id)
        {
            var artistPortfolioModel = await _context.ArtistPortfolio.FindAsync(id);

            if (artistPortfolioModel == null)
            {
                return NotFound();
            }

            return artistPortfolioModel;
        }

        // PUT: api/ArtistPortfolio/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutArtistPortfolioModel(int id, ArtistPortfolioModel artistPortfolioModel)
        {
            if (id != artistPortfolioModel.artist_id)
            {
                return BadRequest();
            }

            _context.Entry(artistPortfolioModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArtistPortfolioModelExists(id))
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

        // POST: api/ArtistPortfolio
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ArtistPortfolioModel>> PostArtistPortfolioModel(ArtistPortfolioModel artistPortfolioModel)
        {
            _context.ArtistPortfolio.Add(artistPortfolioModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetArtistPortfolioModel", new { id = artistPortfolioModel.artist_id }, artistPortfolioModel);
        }

        // DELETE: api/ArtistPortfolio/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArtistPortfolioModel(int id)
        {
            var artistPortfolioModel = await _context.ArtistPortfolio.FindAsync(id);
            if (artistPortfolioModel == null)
            {
                return NotFound();
            }

            _context.ArtistPortfolio.Remove(artistPortfolioModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ArtistPortfolioModelExists(int id)
        {
            return _context.ArtistPortfolio.Any(e => e.artist_id == id);
        }
    }
}
