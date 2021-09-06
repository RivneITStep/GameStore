using CourseworkDTO.Models.Product.SystemRequirements;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CourseworkDTO.Models.Product
{
     public class GameAddDTO
    {
        [Required(ErrorMessage = "Name is Rrequired!")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Price is Rrequired!")]
        public decimal Price { get; set; }
        [Required(ErrorMessage = "Description is Rrequired!")]
        public string Description { get; set; }
        [Required(ErrorMessage = "CompanyName is Rrequired!")]
        public string CompanyName { get; set; }
        [Required(ErrorMessage = "Data is Rrequired!")]
        public DateTime Data { get; set; }

        [Required(ErrorMessage = "sysreqProduct is Rrequired!")]
        public SystemRequirementsAddDTO sysreqProduct { get; set; }

        
        [Required(ErrorMessage = "listIdLang is Rrequired!")]
        public List<int> listIdLang { get; set; }
        [Required(ErrorMessage = "listIdCateg is Rrequired!")]
        public List<int> listIdCateg { get; set; }


    }
}
