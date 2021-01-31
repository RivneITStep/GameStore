using DataAccess.Entity.Store.Communication;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DataAccess.Entity.Store
{
    [Table("tblSeriesGames")]
    public class SeriesGame
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }

        //public GameSeriesGames[] GameSeriesGames { get; set; }
    }
}
