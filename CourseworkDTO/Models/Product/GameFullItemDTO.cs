using CourseworkDTO.Models.Product.SystemRequirements;
using System;
using System.Collections.Generic;
using System.Text;

namespace CourseworkDTO.Models.Product
{
    public class GameFullItemDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public double Price { get; set; }

        public string Description { get; set; }

        public string Developer { get; set; }
        public string Publisher { get; set; }
        public int Evaluation { get; set; }
        public string ImageHead { get; set; }
        public string Image1 { get; set; }
        public string Image2 { get; set; }
        public string Image3 { get; set; }
        public string Image4 { get; set; }

        public DateTime Data { get; set; }

    }
}
