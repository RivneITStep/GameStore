using CourseworkAPIAngular.Helper;
using CourseworkDTO.Models.Product;
using DataAccess;
using DTO.Models.Results;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Threading.Tasks;

namespace APIAngular.Controllers
{
    [Route("api/Product")]
    [ApiController]
    public class ProductController : ControllerBase
    {

        private readonly EFContext _context;
        private readonly IWebHostEnvironment _appEnvironment;

        public ProductController(IWebHostEnvironment appEnvironment, EFContext context)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        [HttpGet]
        public IEnumerable<GameItemDTO> getProducts()
        {

            List<GameItemDTO> data = new List<GameItemDTO>();
            var dataFormDB = _context.Games.ToList();
            foreach (var item in dataFormDB)
            {

                GameItemDTO temp = new GameItemDTO();

                temp.CompanyName = item.Developer;
                temp.Data = item.Data;
                temp.Id = item.Id;
                temp.ImageHead = item.ImageHead;
                temp.Name = item.Name;
                temp.Price = item.Price;

                data.Add(temp);

            }
            return data;
        }


    }
}
