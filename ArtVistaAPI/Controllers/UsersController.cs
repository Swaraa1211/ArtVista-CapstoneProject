using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ArtVistaAPI.Data;
using ArtVistaAPI.Models;
using ArtVistaAPI.Migrations;

namespace ArtVistaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public UsersController(ApplicationDBContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UsersModel>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UsersModel>> GetUsersModel(int id)
        {
            var usersModel = await _context.Users.FindAsync(id);

            if (usersModel == null)
            {
                return NotFound();
            }

            return usersModel;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsersModel(int id, UsersModel usersModel)
        {
            if (id != usersModel.user_id)
            {
                return BadRequest();
            }

            _context.Entry(usersModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsersModelExists(id))
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

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
		public async Task<ActionResult<UsersModel>> PostUsersModel(UsersModel usersModel)
		{
			var temp = _context.Users
				.FirstOrDefault(x => x.user_name == usersModel.user_name
					&& x.user_email == usersModel.user_email);

			if (temp == null)
			{
				string hashedPassword = BCrypt.Net.BCrypt.HashPassword(usersModel.user_password);
				usersModel.user_password = hashedPassword;
				_context.Users.Add(usersModel);
				await _context.SaveChangesAsync();
			}
			else
			{
				usersModel = temp;
			}

			return Ok(usersModel);
		}

		[HttpPost("Login")]
		public async Task<ActionResult<UsersModel>> LoginUser(UsersModel data)
		{
			// Find user by email
			var userModel = await _context.Users.FirstOrDefaultAsync(u => u.user_email == data.user_email);

			if (userModel == null)
			{
				return NotFound();
			}

			// Validate password
			if (!BCrypt.Net.BCrypt.Verify(data.user_password, userModel.user_password))
			{
				return StatusCode(401, "Invalid password");
			}

			// Return user model
			return Ok(new
			{
				userId = userModel.user_id,
				username = userModel.user_name,
				email = userModel.user_email,
			}
			);
		}

		// DELETE: api/Users/5
		[HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsersModel(int id)
        {
            var usersModel = await _context.Users.FindAsync(id);
            if (usersModel == null)
            {
                return NotFound();
            }

            _context.Users.Remove(usersModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UsersModelExists(int id)
        {
            return _context.Users.Any(e => e.user_id == id);
        }
    }
}
