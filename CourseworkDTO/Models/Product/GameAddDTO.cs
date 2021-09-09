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
        public double Price { get; set; }
        [Required(ErrorMessage = "Evaluation is Rrequired!")]
        public int Evaluation { get; set; }
        [Required(ErrorMessage = "Description is Rrequired!")]
        public string Description { get; set; }
        [Required(ErrorMessage = "Developer is Rrequired!")]
        public string Developer { get; set; }
        [Required(ErrorMessage = "Publisher is Rrequired!")]
        public string Publisher { get; set; }
        [Required(ErrorMessage = "Data is Rrequired!")]
        public DateTime Data { get; set; }
        public string ImageHead { get; set; }

        public string Image1 { get; set; }
        public string Image2 { get; set; }
        public string Image3 { get; set; }
        public string Image4 { get; set; }


        [Required(ErrorMessage = "sysreqProduct is Rrequired!")]
        public SystemRequirementsAddDTO sysreqProduct { get; set; }
        [Required(ErrorMessage = "sysminProduct is Rrequired!")]
        public SystemRequirementsAddDTO sysminProduct { get; set; }


        [Required(ErrorMessage = "listIdLang is Rrequired!")]
        public List<int> listIdLang { get; set; }
        [Required(ErrorMessage = "listIdCateg is Rrequired!")]
        public List<int> listIdCateg { get; set; }


    }
}
