using DataAccess;
using DataAccess.Entity.Role;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIAngular.Helper
{
    public class SeederDatabase
    {

        public static void SeedData(IServiceProvider services,
          IWebHostEnvironment env,
          IConfiguration config)
        {
            using (var scope = services.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var manager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
                var managerRole = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
                var context = scope.ServiceProvider.GetRequiredService<EFContext>();
                SeedUsers(manager, managerRole);
            }
        }
        private static void SeedUsers(UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            var roleName = "Admin";
            if (roleManager.FindByNameAsync(roleName).Result == null)
            {
                var resultAdminRole = roleManager.CreateAsync(new IdentityRole
                {
                    Name = "Admin"
                }).Result;
                var resultUserRole = roleManager.CreateAsync(new IdentityRole
                {
                    Name = "User"
                }).Result;
                var resultPublisherRole = roleManager.CreateAsync(new IdentityRole
                {
                    Name = "Publisher"
                }).Result;
            }


            string email = "admin@gmail.com";
            var admin = new User
            {
                Email = email,
                UserName = email
            };
            var andrii = new User
            {
                Email = "cuanid236316@gmail.com",
                UserName = "cuanid236316@gmail.com"
            };
            var SEGA = new User
            {
                Email = "SEGA@gmail.com",
                UserName = "SEGA@gmail.com"
            };

            var resultAdmin = userManager.CreateAsync(admin, "Qwerty1-").Result;
            resultAdmin = userManager.AddToRoleAsync(admin, "Admin").Result;

            var resultAndrii = userManager.CreateAsync(andrii, "Qwerty1-").Result;
            resultAndrii = userManager.AddToRoleAsync(andrii, "User").Result;

            var resultSEGA = userManager.CreateAsync(SEGA, "Qwerty1-").Result;
            resultSEGA = userManager.AddToRoleAsync(SEGA, "Publisher").Result;
        }

    }
}
