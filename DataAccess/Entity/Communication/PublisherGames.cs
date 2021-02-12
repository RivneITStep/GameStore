using DataAccess.Entity.Role;
using DataAccess.Entity.Store.Product;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DataAccess.Entity.Communication
{
    [Table("tblPublisherGames")]
    public class PublisherGames
    {
        [Key, ForeignKey("PublisherOf"), Column(Order = 1)]
        public int PublisherId { get; set; }
        public virtual User PublisherOf { get; set; }


        [Key, ForeignKey("GameOf"), Column(Order = 2)]
        public int GameId { get; set; }
        public virtual Game GameOf { get; set; }
    }
}
