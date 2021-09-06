using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DataAccess.Entity.Store.Product
{
    [Table("tblGame")]
    public class Game
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public string Name { get; set; }
        [Required]
        public string ImageHead { get; set; }

        public string Image1 { get; set; }
        public string Image2 { get; set; }
        public string Image3 { get; set; }
        public string Image4 { get; set; }


        [Required]
        public double Price { get; set; }
        [Required]
        public string Description { get; set; }       
        [Required]
        public int Evaluation { get; set; }
        [Required]
        public string Developer { get; set; }
        [Required]
        public string Publisher { get; set; }

        [Required]
        public DateTime Data { get; set; }

        [Required]
        public MinSystemRequirements MinSystemRequirementProduct { get; set; }
        [Required]
        public RecSystemRequirements RecSystemRequirementProduct { get; set; }


    }
}
