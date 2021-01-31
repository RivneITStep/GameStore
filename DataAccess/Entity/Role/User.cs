using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Entity.Role
{
    public class User : IdentityUser
    {
        public virtual UserMoreInfo userMoreInfo { get; set; }
    }
}
