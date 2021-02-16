using DataAccess.Entity;
using DataAccess.Entity.Role;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace APIAngular.Helper
{
        public class CustomEmail : ValidationAttribute
        {
            protected override ValidationResult IsValid(object value,
                ValidationContext validationContext)
            {
                if (value != null)
                {
                    var service = (UserManager<User>)validationContext
                             .GetService(typeof(UserManager<User>));


                    var user = service.FindByEmailAsync(value.ToString())
                        .Result;

                    if (user != null)
                    {
                        return new ValidationResult(null);
                    }
                    return ValidationResult.Success;
                }
                return new ValidationResult(null);
            }
        }


        public class IsDigitalsAttribute : ValidationAttribute
        {
            protected override ValidationResult IsValid(object value,
                ValidationContext validationContext)
            {
                if (value != null)
                {

                    return ValidationResult.Success;
                }
                return new ValidationResult(null);
            }
        }
    }