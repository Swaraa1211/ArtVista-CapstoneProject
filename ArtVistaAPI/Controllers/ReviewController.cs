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
    public class ReviewController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public ReviewController(ApplicationDBContext context)
        {
            _context = context;
        }

        // GET: api/Review
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReviewModel>>> GetReviewModel()
        {
            return await _context.Review.ToListAsync();
        }

        // GET: api/Review/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ReviewModel>> GetReviewModel(int id)
        {
            var reviewModel = await _context.Review.FindAsync(id);

            if (reviewModel == null)
            {
                return NotFound();
            }

            return reviewModel;
        }

        // PUT: api/Review/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReviewModel(int id, ReviewModel reviewModel)
        {
            if (id != reviewModel.review_id)
            {
                return BadRequest();
            }

            _context.Entry(reviewModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReviewModelExists(id))
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

        // POST: api/Review
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ReviewModel>> PostReviewModel(ReviewModel reviewModel)
        {
            _context.Review.Add(reviewModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReviewModel", new { id = reviewModel.review_id }, reviewModel);
        }

        // DELETE: api/Review/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReviewModel(int id)
        {
            var reviewModel = await _context.Review.FindAsync(id);
            if (reviewModel == null)
            {
                return NotFound();
            }

            _context.Review.Remove(reviewModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReviewModelExists(int id)
        {
            return _context.Review.Any(e => e.review_id == id);
        }
    }
}
