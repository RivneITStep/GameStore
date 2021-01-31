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
        public string[] Image { get; set; }
        [Required]
        public double Price { get; set; }
        [Required]
        public string Description { get; set; }       
        [Required]
        public string[] Genre { get; set; }

        [Required]
        public string[] EvaluationOfPublications { get; set; }
        [Required]
        public string[] Reviews { get; set; }

        [Required]
        public DateTime Data { get; set; }

        public virtual Game[] DLC { get; set; }


        [Required]
        public SystemRequirements MinSystemRequirementProduct { get; set; }
        [Required]
        public SystemRequirements RecSystemRequirementProduct { get; set; }

    }
}
