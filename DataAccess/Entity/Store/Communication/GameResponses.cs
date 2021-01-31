using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DataAccess.Entity.Store.Product.Communication
{
    [Table("tblGameResponses")]
    public class GameResponses
    {
        [Key, ForeignKey("GameOf"), Column(Order = 1)]
        public int GameId { get; set; }
        public virtual Game GameOf { get; set; }


        [Key, ForeignKey("ResponseOf"), Column(Order = 2)]
        public int ResponseId { get; set; }
        public virtual Response ResponseOf { get; set; }
    }
}
