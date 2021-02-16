using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CourseworkDTO.Models
{
    public class UserLoginDTO
    {
        [Required(ErrorMessage = "Please, enter email")]
        public string email { get; set; }
        [Required(ErrorMessage = "Please, enter password")]
        public string password { get; set; }
    }
}
