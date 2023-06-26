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
    public class FavoritesController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public FavoritesController(ApplicationDBContext context)
        {
            _context = context;
        }

        // GET: api/Favorites
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FavoritesModel>>> GetFavoritesModel()
        {
            return await _context.Favorites.ToListAsync();
        }

        // GET: api/Favorites/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FavoritesModel>> GetFavoritesModel(int id)
        {
            var favoritesModel = await _context.Favorites.FindAsync(id);

            if (favoritesModel == null)
            {
                return NotFound();
            }

            return favoritesModel;
        }

        // PUT: api/Favorites/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFavoritesModel(int id, FavoritesModel favoritesModel)
        {
            if (id != favoritesModel.fav_id)
            {
                return BadRequest();
            }

            _context.Entry(favoritesModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FavoritesModelExists(id))
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

        // POST: api/Favorites
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<FavoritesModel>> PostFavoritesModel(FavoritesModel favoritesModel)
        {
            _context.Favorites.Add(favoritesModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFavoritesModel", new { id = favoritesModel.fav_id }, favoritesModel);
        }

        // DELETE: api/Favorites/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFavoritesModel(int id)
        {
            var favoritesModel = await _context.Favorites.FindAsync(id);
            if (favoritesModel == null)
            {
                return NotFound();
            }

            _context.Favorites.Remove(favoritesModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FavoritesModelExists(int id)
        {
            return _context.Favorites.Any(e => e.fav_id == id);
        }
    }
}
