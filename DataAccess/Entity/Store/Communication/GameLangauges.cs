using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DataAccess.Entity.Store.Product.Communication
{
    [Table("tblGameLangauges")]
    public class GameLangauges
    {
        [Key, ForeignKey("GameOf"), Column(Order = 1)]
        public int GameId { get; set; }
        public virtual Game GameOf { get; set; }


        [Key, ForeignKey("LanguageOf"), Column(Order = 2)]
        public int LanguageId { get; set; }
        public virtual Language LanguageOf { get; set; }
    }
}
