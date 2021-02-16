using System;
using System.Collections.Generic;
using System.Text;

namespace CourseworkDTO.Models.Results
{
    public class ResultDTO
    {
        public int Status { get; set; }

        public string Message { get; set; }
        public List<string> Errors { get; set; }
        public string Token { get; set; }
    }
}
