using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DataAccess.Entity.Role.Communication
{
    [Table("tblUserFriends")]
    public class UserFriends
    {

        [Key, ForeignKey("UserOf"), Column(Order = 1)]
        public string UserId { get; set; }
        public virtual User UserOf { get; set; }


        [Key, ForeignKey("FriendOf"), Column(Order = 2)]
        public string FriendId { get; set; }
        public virtual User FriendOf { get; set; }

    }
}
