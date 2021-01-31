using DataAccess.Entity.Store.Product;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DataAccess.Entity.Store.Communication
{
    [Table("tblGameSeriesGames")]
    public class GameSeriesGames
    {
        [Key, ForeignKey("GameOf"), Column(Order = 1)]
        public int GameId { get; set; }
        public virtual Game GameOf { get; set; }


        [Key, ForeignKey("SeriesGameOf"), Column(Order = 2)]
        public int SeriesGameId { get; set; }
        public virtual SeriesGame SeriesGameOf { get; set; }
    }
}
