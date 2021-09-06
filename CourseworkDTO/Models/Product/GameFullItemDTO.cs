using CourseworkDTO.Models.Product.SystemRequirements;
using System;
using System.Collections.Generic;
using System.Text;

namespace CourseworkDTO.Models.Product
{
    public class GameFullItemDTO
    {

        public string Name { get; set; }

        public decimal Price { get; set; }

        public string Description { get; set; }

        public string CompanyName { get; set; }

        public string Image { get; set; }

        public DateTime Data { get; set; }


        public SystemRequirementsAddDTO sysreqProduct { get; set; }



        public List<int> listIdLang { get; set; }

        public List<int> listIdCateg { get; set; }

    }
}
