using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.Models.Product.SystemRequirements
{
    public class SystemRequirementsEditDTO
    {
        public string Id { get; set; }
        public string OS { get; set; }
        public string Processor { get; set; }
        public string Memory { get; set; }
        public string Graphics { get; set; }
        public string Storege { get; set; }
    }
}
