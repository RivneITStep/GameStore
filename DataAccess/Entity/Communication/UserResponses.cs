using DataAccess.Entity.Role;
using DataAccess.Entity.Store.Product.Communication;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DataAccess.Entity.Communication
{
    [Table("tblUserResponses")]
    public class UserResponses
    {
        [Key, ForeignKey("UserOf"), Column(Order = 1)]
        public int UserId { get; set; }
        public virtual User UserOf { get; set; }


        [Key, ForeignKey("ResponseOf"), Column(Order = 2)]
        public int ResponseId { get; set; }
        public virtual Response ResponseOf { get; set; }
    }
}
