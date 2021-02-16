using DataAccess.Entity.Communication;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DataAccess.Entity.Role
{
    [Table("tblMoreInfo")]
    public class UserMoreInfo
    {
        [Key]
        public string Id { get; set; }
        [Required]
        public string FullName { get; set; }

        public string Image { get; set; }
        public int Age { get; set; }

        public string Address { get; set; }

        [Required]
        public string Description { get; set; }

        public virtual User User { get; set; }

    }

    //public UserFriends[] UserFriends { get; set; }

    //public UserResponses[] UserResponses { get; set; }

    //public UserGames[] UserGames { get; set; }

}

