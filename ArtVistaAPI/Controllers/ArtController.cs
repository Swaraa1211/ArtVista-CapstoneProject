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
    public class ArtController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public ArtController(ApplicationDBContext context)
        {
            _context = context;
        }

        // GET: api/Art
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ArtModel>>> GetArtModel()
        {
            return await _context.Art.ToListAsync();
        }

        // GET: api/Art/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ArtModel>> GetArtModel(int id)
        {
            var artModel = await _context.Art.FindAsync(id);

            if (artModel == null)
            {
                return NotFound();
            }

            return artModel;
        }

        // PUT: api/Art/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutArtModel(int id, ArtModel artModel)
        {
            Console.WriteLine(artModel.art_id);
            if (id != artModel.art_id)
            {
                return BadRequest();
            }

         

            try
            {
				_context.Entry(artModel).State = EntityState.Modified;
				await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArtModelExists(id))
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

        // POST: api/Art
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ArtModel>> PostArtModel(ArtModel artModel)
        {
            _context.Art.Add(artModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetArtModel", new { id = artModel.art_id }, artModel);
        }

        // DELETE: api/Art/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArtModel(int id)
        {
            var artModel = await _context.Art.FindAsync(id);
            if (artModel == null)
            {
                return NotFound();
            }

            _context.Art.Remove(artModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ArtModelExists(int id)
        {
            return _context.Art.Any(e => e.art_id == id);
        }
    }
}
