using DataAccess.Entity.Store.Product;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DataAccess.Entity.Store.Communication
{
    [Table("tblGameImages")]
    public class GameImages
    {
        [Key, ForeignKey("GameOf"), Column(Order = 1)]
        public int GameId { get; set; }
        public virtual Game GameOf { get; set; }


        [Key, ForeignKey("GanreOf"), Column(Order = 2)]
        public int ImageId { get; set; }
        public virtual Images ImageOf { get; set; }
    }
}
