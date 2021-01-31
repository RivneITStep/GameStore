using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DataAccess.Entity.Store.Product.Communication
{
    [Table("tblGameGanres")]
    public class GameGanres
    {
        [Key, ForeignKey("GameOf"), Column(Order = 1)]
        public int GameId { get; set; }
        public virtual Game GameOf { get; set; }


        [Key, ForeignKey("GanreOf"), Column(Order = 2)]
        public int GanreId { get; set; }
        public virtual Ganre GanreOf { get; set; }

    }
}
