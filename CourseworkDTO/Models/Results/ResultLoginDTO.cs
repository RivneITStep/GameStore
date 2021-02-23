using DTO.Models.Results;
using System;
using System.Collections.Generic;
using System.Text;

namespace BaseJWTApplication819.DTO.Models.Results
{
    public class ResultLoginDTO : ResultDTO
    {
        public string Token { get; set; }
    }
}
