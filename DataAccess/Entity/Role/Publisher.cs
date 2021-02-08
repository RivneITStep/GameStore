using DataAccess.Entity.Communication;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DataAccess.Entity.Role
{

    public class Publisher : IdentityUser
    {

        public virtual PublisherMoreInfo publisherMoreInfo { get; set; }
    }
}
