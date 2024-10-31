using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpGet("users")]
        public async Task<ActionResult<List<User>>> getUsers()
        {
            var users = new List<User>
            {
                new User
                {
                    ID = "xxxxxxxxxxxxx",
                    Name = "x",
                    Email = "x@x.com",
                    Password = "xxxxx@"
                }

            };

            return Ok(users);
        }
        //[HttpGet("users/{id}")]
        //[HttpPost("users/login")]
        //[HttpPost("users")]
        //[HttpPut("users{id}")]
        //[HttpDelete("users{id}")]
    }
}
