using Microsoft.AspNetCore.Mvc;
using Final.API.Data;
using Microsoft.EntityFrameworkCore;

namespace Final.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EntertainersController : ControllerBase
    {
        private FinalDbContext _context;

        public EntertainersController(FinalDbContext context)
        {
            _context = context;
        }

        // ✅ GET all entertainers with booking count and last booked date
        [HttpGet("AllEntertainers")]
        public IActionResult GetAllEntertainers()
        {
            var entertainers = _context.Entertainers
                .Select(e => new
                {
                    e.EntertainerID,
                    e.EntStageName,
                    BookingCount = _context.Set<Engagement>().Count(b => b.EntertainerID == e.EntertainerID),
                    LastBookedDate = _context.Set<Engagement>()
                        .Where(b => b.EntertainerID == e.EntertainerID)
                        .Max(b => (DateTime?)b.StartDate)
                })
                .ToList();

            return Ok(entertainers);
        }

        // ✅ GET full details by ID
        [HttpGet("GetEntertainerDetails/{id}")]
        public IActionResult GetEntertainerDetails(int id)
        {
            var entertainer = _context.Entertainers.FirstOrDefault(e => e.EntertainerID == id);
            if (entertainer == null)
            {
                return NotFound(new { message = "Entertainer not found" });
            }

            return Ok(entertainer);
        }

        // ✅ POST - Add
        [HttpPost("AddEntertainer")]
        public IActionResult AddEntertainer([FromBody] Entertainer newEntertainer)
        {
            _context.Entertainers.Add(newEntertainer);
            _context.SaveChanges();

            return Ok(newEntertainer);
        }

        // ✅ PUT - Update
        [HttpPut("UpdateEntertainer/{id}")]
        public IActionResult UpdateEntertainer(int id, [FromBody] Entertainer updated)
        {
            var existing = _context.Entertainers.Find(id);
            if (existing == null)
            {
                return NotFound(new { message = "Entertainer not found" });
            }

            // Manually map fields
            existing.EntStageName = updated.EntStageName;
            existing.EntStreetAddress = updated.EntStreetAddress;
            existing.EntCity = updated.EntCity;
            existing.EntState = updated.EntState;
            existing.EntZipCode = updated.EntZipCode;
            existing.EntPhoneNumber = updated.EntPhoneNumber;
            existing.EntWebPage = updated.EntWebPage;
            existing.EntEMailAddress = updated.EntEMailAddress;
            existing.DateEntered = updated.DateEntered;

            _context.Entertainers.Update(existing);
            _context.SaveChanges();

            return Ok(existing);
        }

        // ✅ DELETE - Remove
        [HttpDelete("DeleteEntertainer/{id}")]
        public IActionResult DeleteEntertainer(int id)
        {
            var entertainer = _context.Entertainers.Find(id);
            if (entertainer == null)
            {
                return NotFound(new { message = "Entertainer not found" });
            }

            _context.Entertainers.Remove(entertainer);
            _context.SaveChanges();
            return NoContent();
        }

        // 🧠 Temporary Engagement class for EF Core query
        public class Engagement
        {
            public int EngagementNumber { get; set; }
            public DateTime StartDate { get; set; }
            public int EntertainerID { get; set; }
        }
    }
}