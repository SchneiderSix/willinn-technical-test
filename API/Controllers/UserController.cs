using API.Data;
using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;

namespace API.Controllers
{
    [Route("api/")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DataContext _context;

        public UserController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("users")]
        public async Task<ActionResult<List<User>>> GetUsers()
        {
            var users = await _context.Users
                .Where(i => i.IsActive)
                .Select(i => new { ID = i.ID, Name = i.Name, Email = i.Email, IsActive = i.IsActive })
                .ToListAsync();

            return Ok(users);
        }

        [HttpGet("users/{id}")]
        public async Task<ActionResult<User>> GetUser(string id)
        {
            var user = await _context.Users.Where(i => i.ID == id && i.IsActive).FirstOrDefaultAsync();

            if (user == null) return NotFound("User not found.");

            return Ok(new { user.Email, user.Name, user.ID });
        }

        [HttpPost("users/login")]
        public async Task<ActionResult<User>> Login(User loginUser)
        {
            var user = await _context.Users.Where(i => i.Email == loginUser.Email && i.IsActive).FirstOrDefaultAsync();

            if (user == null || !BCrypt.Net.BCrypt.Verify(loginUser.Password, user.Password)) return BadRequest("Invalid credentials.");

            return Ok(new { user.Email, user.Name, user.ID });
        }

        [HttpPost("users")]
        public async Task<ActionResult<User>> CreateUser(User newUser)
        {
            if (string.IsNullOrEmpty(newUser.Password)) return BadRequest("Invalid credentials.");

            var existingUser = await _context.Users.FirstOrDefaultAsync(i => i.Email == newUser.Email && i.IsActive != false );

            if (existingUser != null) return Conflict("User already exists.");

            newUser.Password = BCrypt.Net.BCrypt.HashPassword(newUser.Password, workFactor: 13);

            newUser.ID = Guid.NewGuid().ToString();

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(new { newUser.Email, newUser.Name, newUser.ID});
        }

        [HttpPut("users/{id}")]
        public async Task<ActionResult> UpdateUser(string id, User updatedUser)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound("User not found.");

            user.Name = updatedUser.Name;
            user.Email = updatedUser.Email;

            if (!string.IsNullOrEmpty(updatedUser.Password))
            {
                user.Password = BCrypt.Net.BCrypt.HashPassword(updatedUser.Password, workFactor: 13);
            }

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("users/{id}")]
        public async Task<ActionResult> DeleteUser(string id)
        {
            var user = await _context.Users.Where(i => i.ID == id && i.IsActive).FirstOrDefaultAsync();

            if (user == null) return NotFound("User not found.");

            // Logical deletion
            user.IsActive = !user.IsActive;

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
