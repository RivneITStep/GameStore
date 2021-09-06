using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CourseworkDTO.Models.Product
{
    public class GameItemDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public double Price { get; set; }

        public string Developer { get; set; }

        public string CompanyName { get; set; }

        public string ImageHead { get; set; }

        public DateTime Data { get; set; }
    }
}
