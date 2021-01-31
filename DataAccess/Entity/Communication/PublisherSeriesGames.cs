using DataAccess.Entity.Role;
using DataAccess.Entity.Store;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DataAccess.Entity.Communication
{
    [Table("tblPublisherGames")]
    public class PublisherSeriesGames
    {
        [Key, ForeignKey("PublisherOf"), Column(Order = 1)]
        public int PublisherId { get; set; }
        public virtual Publisher PublisherOf { get; set; }


        [Key, ForeignKey("SeriesGameOf"), Column(Order = 2)]
        public int SeriesGameId { get; set; }
        public virtual SeriesGame SeriesGameOf { get; set; }
    }
}
