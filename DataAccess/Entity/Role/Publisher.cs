using DataAccess.Entity.Communication;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DataAccess.Entity.Role
{
    [Table("tblPublisher")]
    public class Publisher
    {
        [Key]
        public string Id { get; set; }
        [Required]
        public string FullName { get; set; }
        [Required]
        public string Image { get; set; }
        [Required]
        public string Description { get; set; }

        //public PublisherGames[] PublisherGames { get; set; }

        //public PublisherSeriesGames[] PublisherSeriesGames { get; set; }
    }
}
