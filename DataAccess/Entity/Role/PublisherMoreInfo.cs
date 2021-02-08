using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DataAccess.Entity.Role
{
    [Table("tblPublisherMoreInfo")]
    public class PublisherMoreInfo
    {
        [Key]
        public string Id { get; set; }
        [Required]
        public string FullName { get; set; }
        [Required]
        public string Image { get; set; }
        [Required]
        public string Description { get; set; }

        public virtual Publisher Publisher { get; set; }
    }
}
