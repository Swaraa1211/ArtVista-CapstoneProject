using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ArtVistaAPI.Data;
using ArtVistaAPI.Models;
using Hangfire;
//sing ArtVistaAPI.Migrations;
using Microsoft.IdentityModel.Tokens;

namespace ArtVistaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BidPriceController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
		private readonly IBackgroundJobClient _backgroundJobs;

		//public NutrientTrackerController(ApplicationDbContext context, IBackgroundJobClient backgroundJobs)
		//{
		//	_context = context;
		//	_backgroundJobs = backgroundJobs;
		//}
		public BidPriceController(ApplicationDBContext context, IBackgroundJobClient backgroundJobs)
        {
            _context = context;
			_backgroundJobs = backgroundJobs;
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
            if (id != bidPriceModel.Bidprice_id)
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

            return CreatedAtAction("GetBidPriceModel", new { id = bidPriceModel.Bidprice_id }, bidPriceModel);
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
            return _context.BidPrice.Any(e => e.Bidprice_id == id);
        }

		//[HttpPost("/bidding/bidPrice")]
		//public async Task<IActionResult> IdentifyUserWithHighestBid([FromBody] BidPriceModel bidPrice)
		//{
		//	try
		//	{
		//		var bid = await _context.BidPrice.ToListAsync();

		//		if (bid != null && bid.Count > 0)
		//		{
		//			int bidArtId = 0;

		//			// Find the BidArt_id that is not sold
		//			foreach (var item in bid)
		//			{
		//				Console.WriteLine($"Bidprice_id: {item.Bidprice_id}, Bidprice: {item.Bidprice}, BidArt_id: {item.BidArt_id}, Status: {item.Status}");
		//				if (item.Status != "Sold")
		//				{
		//					bidArtId = item.BidArt_id;
		//					break;
		//				}
		//			}

		//			if (bidArtId != 0)
		//			{
		//				// Find the highest bid for the specified BidArt_id
		//				var highestBid = bid
		//					.Where(b => b.BidArt_id == bidArtId)
		//					.OrderByDescending(b => b.Bidprice)
		//					.FirstOrDefault();

		//				if (highestBid != null)
		//				{
		//					Console.WriteLine($"Highest Bidprice: {highestBid.Bidprice}, Bidprice_id: {highestBid.Bidprice_id}");

		//					// Assign the status as "Sold" for the highest bid
		//					highestBid.Status = "Sold";
		//					await _context.SaveChangesAsync();
		//				}
		//			}
		//		}

		//		return Ok();
		//	}
		//	catch (Exception ex)
		//	{
		//		Console.WriteLine(ex.ToString());
		//		return StatusCode(StatusCodes.Status500InternalServerError);
		//	}
		//}
		[HttpPost("/bidding/bidPrice")]
		public async Task<IActionResult> IdentifyUserWithHighestBid([FromBody] BidPriceModel bidPrice)
		{
			try
			{
				var bid = await _context.BidPrice.ToListAsync();

				if (bid != null && bid.Count > 0)
				{
					var bidArtIds = bid.Select(b => b.BidArt_id).Distinct().ToList();

					foreach (var bidArtId in bidArtIds)
					{
						var highestBid = bid
							.Where(b => b.BidArt_id == bidArtId)
							.OrderByDescending(b => b.Bidprice)
							.FirstOrDefault();

						if (highestBid != null)
						{
							Console.WriteLine($"Highest Bidprice: {highestBid.Bidprice}, Bidprice_id: {highestBid.Bidprice_id}");

							// Assign the status as "Sold" for the highest bid
							highestBid.Status = "Sold";
						}
					}

					await _context.SaveChangesAsync();
				}

				return Ok();
			}
			catch (Exception ex)
			{
				Console.WriteLine(ex.ToString());
				return StatusCode(StatusCodes.Status500InternalServerError);
			}
		}



	}
}
