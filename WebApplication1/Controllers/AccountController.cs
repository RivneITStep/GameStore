using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BaseJWTApplication819.DTO.Helper;
using BaseJWTApplication819.DTO.Models.Results;
using DataAccess;
using DataAccess.Entity.Role;
using Domain.Interfaces;
using DTO.Models;
using DTO.Models.Results;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BaseJWTApplication819.Api_Angular.Controllers
{
    //localhost:12312/api/Account/
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly EFContext _context;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IJWTTokenService _jWTTokenService;

        public AccountController(
            EFContext context,
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            IJWTTokenService jWTTokenService
            )
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
            _jWTTokenService = jWTTokenService;
        }


        [HttpPost("register")]
        public async Task<ResultDTO> Register([FromBody]UserRegisterDTO model)
        {
            try
            {

                if (!ModelState.IsValid)
                {
                    return new ResultErrorDTO
                    {
                        Status = 403,
                        Message = "ERROR",
                        Errors = CustomValidator.GetErrorsByModel(ModelState)
                    };
                }

                var user = new User()
                {
                    UserName = model.email,
                    Email = model.email,
                    PhoneNumber = model.phoneNumber
                };

                IdentityResult result = await _userManager.CreateAsync(user, model.password);


                if(!result.Succeeded)
                {
                    return new ResultErrorDTO
                    {
                        Message = "ERROR",
                        Status = 500,
                        Errors = CustomValidator.GetErrorsByIdentotyResult(result)
                    };
                }
                else
                {
                    result =  _userManager.AddToRoleAsync(user, "User").Result;
                    _context.SaveChanges();
                }


                return new ResultDTO
                {
                    Status = 200,
                    Message = "OK"
                };
            }
            catch (Exception e)
            {
                return new ResultDTO {
                    Status = 500,
                    Message = e.Message,
                };

            }


        }



        [HttpPost("login")]
        public async Task<ResultDTO> Login([FromBody]UserLoginDTO model)
        {
            if (!ModelState.IsValid)
            {
                return new ResultErrorDTO
                {
                    Status = 403,
                    Message = "Invalid data for login",
                    Errors = CustomValidator.GetErrorsByModel(ModelState)

                };
            }

            //Переірка на успіх з логіном та паролем
            var result = await _signInManager.PasswordSignInAsync(model.email, model.password, false, false);

            if (!result.Succeeded)
            {
                return new ResultErrorDTO
                {
                    Status = 401,
                    Message = "Error",
                    Errors = new List<string>() {
                        "Incorrect login or password!"
                    }
                };
            }
            else
            {
                var user = await _userManager.FindByEmailAsync(model.email);
                await _signInManager.SignInAsync(user,false);

                return new ResultLoginDTO
                {
                    Status = 200,
                    Message = "OK",
                    Token = _jWTTokenService.CreateToken(user)
                };
            }
        }




    }
}