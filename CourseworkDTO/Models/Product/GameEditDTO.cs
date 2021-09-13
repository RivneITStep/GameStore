using CourseworkDTO.Models.Product.SystemRequirements;
using System;
using System.Collections.Generic;
using System.Text;

namespace CourseworkDTO.Models.Product
{
    public class GameEditDTO
    {
        public string Id { get; set; }
       
        public string Name { get; set; }
       
        public double Price { get; set; }
      
        public string Description { get; set; }
        public int Evaluation { get; set; }
        
        public string Developer { get; set; }

        public string Publisher { get; set; }

        public DateTime Data { get; set; }

        public List<int> listIdLang { get; set; }
        public List<int> listIdCateg { get; set; }


    }
}
