using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DataAccess.Entity.Store.Product
{
    [Table("tblRecSystemRequirements")]
    public class RecSystemRequirements
    {
        [Key, ForeignKey("GameOf")]
        public int Id { get; set; }
        [Required]
        public string OS { get; set; }
        [Required]
        public string Processor { get; set; }
        [Required]
        public string Memory { get; set; }
        [Required]
        public string Graphics { get; set; }
        [Required]
        public string Storege { get; set; }
        public virtual Game GameOf { get; set; }
    }
}
