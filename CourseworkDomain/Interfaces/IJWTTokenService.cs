using System;
using System.Collections.Generic;
using System.Text;
using DataAccess.Entity.Role;

namespace Domain.Interfaces
{
    public interface IJWTTokenService
    {
        string CreateToken(User user);

    }
}
