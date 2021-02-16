using DataAccess;
using DataAccess.Entity.Role;
using DTO.Models;
using DTO.Models.Results;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIAngular.Controllers
{
    [Route("api/UserManager")]
    [ApiController]
    public class UserManagerController : ControllerBase
    {
        private readonly EFContext _context;
        private readonly UserManager<User> _userManager;

        public UserManagerController(EFContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        public IEnumerable<UserItemDTO> getUsers()
        {

            List<UserItemDTO> data = new List<UserItemDTO>();
            var dataFormDB = _context.Users.Where(t => t.Email != "admin@gmail.com").ToList();
            foreach (var item in dataFormDB)
            {

                UserItemDTO temp = new UserItemDTO();
                var moreInfo = _context.UserMoreInfo.FirstOrDefault(t => t.Id == item.Id);

                temp.Email = item.Email;
                temp.Id = item.Id;
                temp.Phone = item.PhoneNumber;
                if (moreInfo != null)
                {
                    temp.fullName = moreInfo.FullName;
                    temp.Age = moreInfo.Age;
                    temp.Address = moreInfo.Address;
                }
                data.Add(temp);

            }
            return data;
        }

        [HttpPost("RemoveUser/{id}")]
        public ResultDTO RemoveUser([FromRoute] string id)
        {
            try
            {
                var user = _context.Users.FirstOrDefault(t => t.Id == id);
                var userMoreinfo = _context.UserMoreInfo.FirstOrDefault(t => t.Id == id);

                _context.Users.Remove(user);
                if (userMoreinfo != null)
                {
                    _context.UserMoreInfo.Remove(userMoreinfo);
                }
                _context.SaveChanges();

                return new ResultDTO
                {
                    Status = 200,
                    Message = "OK"
                };

            }
            catch (Exception e)
            {
                List<string> temp = new List<string>();
                temp.Add(e.Message);
                return new ResultDTO
                {
                    Status = 500,
                    Message = "ERROR",
                    Errors = temp
                };
            }
        }

        [HttpGet("{id}")]
        public UserItemDTO GetUser([FromRoute] string id)
        {
            var user = _context.Users.FirstOrDefault(t => t.Id == id);
            var userMoreInfo = _context.UserMoreInfo.FirstOrDefault(t => t.Id == id);


            UserItemDTO model = new UserItemDTO();
            model.Id = user.Id;
            model.Email = user.Email;
            model.Phone = user.PhoneNumber;

            if (userMoreInfo != null)
            {
                model.Age = userMoreInfo.Age;
                model.fullName = userMoreInfo.FullName;
                model.Address = userMoreInfo.Address;
            }

            return model;
        }

        [HttpPost("editProductr/{id}")]
        public ResultDTO EditProductr([FromRoute] string id, [FromBody] UserItemDTO model)
        {
            var user = _context.Users.FirstOrDefault(t => t.Id == id);
            var userMoreInfo = _context.UserMoreInfo.FirstOrDefault(t => t.Id == id);

            user.PhoneNumber = model.Phone;
            userMoreInfo.FullName = model.fullName;
            user.Email = model.Email;

            _context.SaveChanges();

            return new ResultDTO
            {
                Status = 200,
                Message = "OK"
            };

        }
    }


}
