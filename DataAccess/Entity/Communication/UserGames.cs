using DataAccess.Entity.Role;
using DataAccess.Entity.Store.Product;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DataAccess.Entity.Communication
{
    [Table("tblUserGames")]
    public class UserGames
    {
        [Key, ForeignKey("UserOf"), Column(Order = 1)]
        public string UserId { get; set; }
        public virtual User UserOf { get; set; }


        [Key, ForeignKey("GameOf"), Column(Order = 2)]
        public int GameId { get; set; }
        public virtual Game GameOf { get; set; }
    }
}
