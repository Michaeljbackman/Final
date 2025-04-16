using System;
using System.ComponentModel.DataAnnotations;

namespace Final.API.Data
{
    public class Engagement
    {
        [Key]
        public int EngagementNumber { get; set; }
        public DateTime StartDate { get; set; }
        public int EntertainerID { get; set; }
    }
}
