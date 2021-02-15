using System;
using System.Collections.Generic;
using System.Text;
using DataAccess.Entity.Role;

namespace CourseworkDomain.Interfaces
{
    public interface IJWTTokenService
    {
        string CreateToken(User user);

    }
}
