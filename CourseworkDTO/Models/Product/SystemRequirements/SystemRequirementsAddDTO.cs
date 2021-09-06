using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CourseworkDTO.Models.Product.SystemRequirements
{
    public class SystemRequirementsAddDTO
    {
        [Required(ErrorMessage = "OS Required!")]
        public string OS { get; set; }
        [Required(ErrorMessage = "Processor Required!")]
        public string Processor { get; set; }
        [Required(ErrorMessage = "Memory Required!")]
        public string Memory { get; set; }
        [Required(ErrorMessage = "Graphics Required!")]
        public string Graphics { get; set; }
        [Required(ErrorMessage = "Storege Required!")]
        public string Storege { get; set; }
    }
}
