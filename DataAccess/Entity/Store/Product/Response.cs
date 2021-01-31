using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DataAccess.Entity.Store.Product.Communication
{
    [Table("tblResponse")]
    public class Response
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string ResponseText { get; set; }

        [Required]
        public int Rating { get; set; }
    }
}
