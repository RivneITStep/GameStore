﻿using APIAngular.Helper;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DTO.Models
{
    public class UserRegisterDTO
    {
        [Required(ErrorMessage = "Full name is Rrequired!")]
        public string fullName { get; set; }
        [Required(ErrorMessage = "Email is Rrequired!")]
        //[EmailAddress(ErrorMessage = "Email is not correct!")]
        //[CustomEmail(ErrorMessage = "This email is already busy"!)]
        public string email { get; set; }
        [Required(ErrorMessage = "Password is Rrequired!")]
        public string password { get; set; }
        [Required(ErrorMessage = "Phone Number is Rrequired!")]
        public string phoneNumber { get; set; }

    }
}
