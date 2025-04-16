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

        // ✅ GET summary with booking count + last booked date + pagination
        [HttpGet("AllEntertainers")]
        public IActionResult GetAllEntertainers(int pageHowMany = 5, int pageNum = 1)
        {
            var query = _context.Entertainers
                .Select(e => new
                {
                    e.EntertainerID,
                    e.EntStageName,
                    BookingCount = _context.Set<Engagement>().Count(b => b.EntertainerID == e.EntertainerID),
                    LastBookedDate = _context.Set<Engagement>()
                        .Where(b => b.EntertainerID == e.EntertainerID)
                        .Max(b => (DateTime?)b.StartDate)
                });

            var totalEntertainers = query.Count();

            var pagedResults = query
                .Skip((pageNum - 1) * pageHowMany)
                .Take(pageHowMany)
                .ToList();

            return Ok(new
            {
                Entertainers = pagedResults,
                TotalEntertainers = totalEntertainers
            });
        }

        // ✅ GET full list of entertainers (for admin usage)
        [HttpGet]
        public IActionResult GetAllFullEntertainers()
        {
            try
            {
                var fullList = _context.Entertainers.ToList();
                return Ok(fullList);
            }
            catch (Exception ex)
            {
                // Log to console for debugging
                Console.WriteLine("🔥 ERROR in GetAllFullEntertainers: " + ex.Message);
                return StatusCode(500, new { error = "Something went wrong fetching entertainers." });
            }
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
    }
}
