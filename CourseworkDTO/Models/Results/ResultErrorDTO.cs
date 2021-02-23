using DTO.Models.Results;
using System;
using System.Collections.Generic;
using System.Text;

namespace BaseJWTApplication819.DTO.Models.Results
{
    public class ResultErrorDTO :ResultDTO
    {
        public List<string> Errors { get; set; }
    }
}
