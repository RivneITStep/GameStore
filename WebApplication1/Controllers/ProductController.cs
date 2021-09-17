using CourseworkAPIAngular.Helper;
using CourseworkDTO.Models.Product;
using CourseworkDTO.Models.Product.Categories;
using CourseworkDTO.Models.Product.Languages;
using CourseworkDTO.Models.Product.SystemRequirements;
using DataAccess;
using DataAccess.Entity.Communication;
using DataAccess.Entity.Store.Product;
using DataAccess.Entity.Store.Product.Communication;
using DTO.Models.Product;
using DTO.Models.Product.Categories;
using DTO.Models.Product.SystemRequirements;
using DTO.Models.Results;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Numerics;
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
                temp.Image = item.ImageHead;


                temp.Name = item.Name;
                temp.Price = item.Price;

                data.Add(temp);

            }
            return data;
        }

        [HttpGet("getProductsUser/{id}")]
        public IEnumerable<GameItemDTO> getProductsUser(string id)
        {

            List<GameItemDTO> data = new List<GameItemDTO>();
            List<int> dataId = new List<int>();
            var dataFormDB = _context.UserGames.ToList();
            foreach (var item in dataFormDB)
            {

                if(item.UserId == id)
                    dataId.Add(item.GameId);

            }
            var dataFormDBG = _context.Games.ToList();
            foreach (var item in dataFormDBG)
            {
                foreach (var itemId in dataId)
                {
                    if (itemId == item.Id)
                    {
                        GameItemDTO temp = new GameItemDTO();

                        temp.CompanyName = item.Developer;
                        temp.Data = item.Data;
                        temp.Id = item.Id;
                        temp.Image = item.ImageHead;


                        temp.Name = item.Name;
                        temp.Price = item.Price;

                        data.Add(temp);
                    }
                    }
            }

            return data;
        }

        [HttpPost("addProduct")]
        public async Task<ResultDTO> addProduct([FromBody] GameAddDTO model, [FromForm(Name = "file")] IFormFile uploadedImage)
        {
            if (!ModelState.IsValid)
            {
                return new ResultDTO
                {
                    Status = 500,
                    Message = "Error",
                    Errors = Validation.GetErrorsByModel(ModelState)
                };
            }
            else
            {
                var game = new Game()
                {
                    Name = model.Name,
                    Evaluation = model.Evaluation,
                    Publisher = model.Publisher,
                    Developer = model.Developer,
                    Price = model.Price,
                    Description = model.Description,
                    ImageHead = "",
                    Image1 = "",
                    Image2 = "",
                    Image3 = "",
                    Image4 = "",
                    Data = model.Data,
                };
                _context.Games.Add(game);
                _context.SaveChanges();
                int idProduct = (from v in _context.Games orderby v.Id descending select v).FirstOrDefault().Id;
                var minsystemrequirements = new MinSystemRequirements()
                {

                    OS = model.sysminProduct.OS,
                    Processor = model.sysminProduct.Processor,
                    Graphics = model.sysminProduct.Graphics,
                    Memory = model.sysminProduct.Memory,
                    Storege = model.sysminProduct.Storege,
                    Id = idProduct
                };
                var recsystemrequirements = new RecSystemRequirements()
                {

                    OS = model.sysreqProduct.OS,
                    Processor = model.sysreqProduct.Processor,
                    Graphics = model.sysreqProduct.Graphics,
                    Memory = model.sysreqProduct.Memory,
                    Storege = model.sysreqProduct.Storege,
                    Id = idProduct
                };

                _context.RecSystemRequirements.Add(recsystemrequirements);
                _context.MinSystemRequirements.Add(minsystemrequirements);

                foreach (var item in model.listIdLang)
                {

                    GameLangauges temp = new GameLangauges();

                    temp.GameId = idProduct;
                    temp.LanguageId = item;

                    _context.GameLangauges.Add(temp);
                }

                foreach (var item in model.listIdCateg)
                {

                    GameGanres temp = new GameGanres();

                    temp.GameId = idProduct;
                    temp.GanreId = item;

                    _context.GameGanres.Add(temp);
                }

                var product = _context.Games.FirstOrDefault(t => t.Id == idProduct-1);
                _context.Games.Remove(product);
                _context.SaveChanges();


                return new ResultDTO
                {
                    Status = 200
                };

            }
        }

        [HttpGet("LanguagesProduct/{id}")]
        public IEnumerable<LanguagesItemDTO> getLanguagesProduct(int id)
        {

            List<LanguagesItemDTO> data = new List<LanguagesItemDTO>();


            foreach (var item in _context.GameLangauges)
            {
                if (item.GameId == id)
                {
                    Language temp = _context.Languages.FirstOrDefault(t => t.Id == item.LanguageId);

                    LanguagesItemDTO tempItem = new LanguagesItemDTO();

                    tempItem.idLanguage = temp.Id;
                    tempItem.nameLanguage = temp.Name;

                    data.Add(tempItem);
                }
            }
            return data;

        }

        [HttpGet("CategoriesProduct/{id}")]
        public IEnumerable<GanreItemDTO> getCategoriesProduct(int id)
        {

            List<GanreItemDTO> data = new List<GanreItemDTO>();


            foreach (var item in _context.GameGanres)
            {
                if (item.GameId == id)
                {
                    Ganre temp = _context.Ganres.FirstOrDefault(t => t.Id == item.GanreId);

                    GanreItemDTO tempItem = new GanreItemDTO();

                    tempItem.idCategory = temp.Id;
                    tempItem.nameCategory = temp.Name;

                    data.Add(tempItem);
                }
            }
            return data;

        }

        [HttpGet("GetLanguages")]
        public IEnumerable<LanguagesItemDTO> GetLanguages()
        {


            List<LanguagesItemDTO> data = new List<LanguagesItemDTO>();
            var dataFormDB = _context.Languages.ToList();
            foreach (var item in dataFormDB)
            {

                LanguagesItemDTO temp = new LanguagesItemDTO();

                temp.idLanguage = item.Id;
                temp.nameLanguage = item.Name;

                data.Add(temp);

            }
            return data;

        }

        [HttpGet("GetCategories")]
        public IEnumerable<GanreItemDTO> GetCategories()
        {


            List<GanreItemDTO> data = new List<GanreItemDTO>();
            var dataFormDB = _context.Ganres.ToList();
            foreach (var item in dataFormDB)
            {

                GanreItemDTO temp = new GanreItemDTO();

                temp.idCategory = item.Id;
                temp.nameCategory = item.Name;

                data.Add(temp);

            }
            return data;

        }

        [HttpPost("UploadImage")]
        public ResultDTO UploadImage([FromForm(Name = "file")] IFormFile uploadedImage)
        {
            string fileName = Guid.NewGuid().ToString() + ".jpg";
            string path = _appEnvironment.ContentRootPath + @"\ClientApp\src\assets\img\" + fileName;
            if (uploadedImage == null)
                return new ResultDTO
                {
                    Status = 400,
                    Errors = new List<string> { "Не вдалося завантажити файл" }
                };
            if (uploadedImage.Length == 0)
                return new ResultDTO
                {
                    Status = 400,
                    Errors = new List<string> { "Файл порожній" }
                };
            try
            {
                using (Bitmap bmp = new Bitmap(uploadedImage.OpenReadStream()))
                {
                    var saveImage = ImageWorker.CreateImage(bmp, 460, 215);
                    int idProduct = (from v in _context.Games orderby v.Id descending select v).FirstOrDefault().Id;
                    if (saveImage != null)
                    {
                        saveImage.Save(path, ImageFormat.Jpeg);
                        var product = _context.Games.Find(idProduct);

                        _context.Games.Find(idProduct).ImageHead = fileName;
                        _context.SaveChanges();
                    }
                }
            }
            catch (Exception ex)
            {
                return new ResultDTO
                {
                    Status = 400,
                    Errors = new List<string> { "Не вдалося завантажити файл" },
                    Message = ex.InnerException.Message
                };
            }
            return new ResultDTO
            {
                Status = 200
            };
        }

        [HttpPost("UploadImage1")]
        public ResultDTO UploadImage1([FromForm(Name = "file")] IFormFile uploadedImage)
        {
 
                string fileName = Guid.NewGuid().ToString() + ".jpg";
                string path = _appEnvironment.ContentRootPath + @"\ClientApp\src\assets\img\" + fileName;
                if (uploadedImage == null)
                    return new ResultDTO
                    {
                        Status = 400,
                        Errors = new List<string> { "Не вдалося завантажити файл" }
                    };
                if (uploadedImage.Length == 0)
                    return new ResultDTO
                    {
                        Status = 400,
                        Errors = new List<string> { "Файл порожній" }
                    };
                try
                {
                    using (Bitmap bmp = new Bitmap(uploadedImage.OpenReadStream()))
                    {
                        var saveImage = ImageWorker.CreateImage(bmp, 600, 337);
                        int idProduct = (from v in _context.Games orderby v.Id descending select v).FirstOrDefault().Id;
                        if (saveImage != null)
                        {
                            saveImage.Save(path, ImageFormat.Jpeg);
                            var product = _context.Games.Find(idProduct);

                         _context.Games.Find(idProduct).Image1 = fileName; 
     
                            _context.SaveChanges();
                        }
                    }
                }
                catch (Exception ex)
                {
                    return new ResultDTO
                    {
                        Status = 400,
                        Errors = new List<string> { "Не вдалося завантажити файл" },
                        Message = ex.InnerException.Message
                    };
                }
            
                return new ResultDTO
                {
                    Status = 200
                };
            
        }

        [HttpPost("UploadImage2")]
        public ResultDTO UploadImage2([FromForm(Name = "file")] IFormFile uploadedImage)
        {

            string fileName = Guid.NewGuid().ToString() + ".jpg";
            string path = _appEnvironment.ContentRootPath + @"\ClientApp\src\assets\img\" + fileName;
            if (uploadedImage == null)
                return new ResultDTO
                {
                    Status = 400,
                    Errors = new List<string> { "Не вдалося завантажити файл" }
                };
            if (uploadedImage.Length == 0)
                return new ResultDTO
                {
                    Status = 400,
                    Errors = new List<string> { "Файл порожній" }
                };
            try
            {
                using (Bitmap bmp = new Bitmap(uploadedImage.OpenReadStream()))
                {
                    var saveImage = ImageWorker.CreateImage(bmp, 600, 337);
                    int idProduct = (from v in _context.Games orderby v.Id descending select v).FirstOrDefault().Id;
                    if (saveImage != null)
                    {
                        saveImage.Save(path, ImageFormat.Jpeg);
                        var product = _context.Games.Find(idProduct);

                        _context.Games.Find(idProduct).Image2 = fileName;

                        _context.SaveChanges();
                    }
                }
            }
            catch (Exception ex)
            {
                return new ResultDTO
                {
                    Status = 400,
                    Errors = new List<string> { "Не вдалося завантажити файл" },
                    Message = ex.InnerException.Message
                };
            }

            return new ResultDTO
            {
                Status = 200
            };

        }

        [HttpPost("UploadImage3")]
        public ResultDTO UploadImage3([FromForm(Name = "file")] IFormFile uploadedImage)
        {

            string fileName = Guid.NewGuid().ToString() + ".jpg";
            string path = _appEnvironment.ContentRootPath + @"\ClientApp\src\assets\img\" + fileName;
            if (uploadedImage == null)
                return new ResultDTO
                {
                    Status = 400,
                    Errors = new List<string> { "Не вдалося завантажити файл" }
                };
            if (uploadedImage.Length == 0)
                return new ResultDTO
                {
                    Status = 400,
                    Errors = new List<string> { "Файл порожній" }
                };
            try
            {
                using (Bitmap bmp = new Bitmap(uploadedImage.OpenReadStream()))
                {
                    var saveImage = ImageWorker.CreateImage(bmp, 600, 337);
                    int idProduct = (from v in _context.Games orderby v.Id descending select v).FirstOrDefault().Id;
                    if (saveImage != null)
                    {
                        saveImage.Save(path, ImageFormat.Jpeg);
                        var product = _context.Games.Find(idProduct);

                        _context.Games.Find(idProduct).Image3 = fileName;

                        _context.SaveChanges();
                    }
                }
            }
            catch (Exception ex)
            {
                return new ResultDTO
                {
                    Status = 400,
                    Errors = new List<string> { "Не вдалося завантажити файл" },
                    Message = ex.InnerException.Message
                };
            }

            return new ResultDTO
            {
                Status = 200
            };

        }

        [HttpPost("UploadImage4")]
        public ResultDTO UploadImage4([FromForm(Name = "file")] IFormFile uploadedImage)
        {

            string fileName = Guid.NewGuid().ToString() + ".jpg";
            string path = _appEnvironment.ContentRootPath + @"\ClientApp\src\assets\img\" + fileName;
            if (uploadedImage == null)
                return new ResultDTO
                {
                    Status = 400,
                    Errors = new List<string> { "Не вдалося завантажити файл" }
                };
            if (uploadedImage.Length == 0)
                return new ResultDTO
                {
                    Status = 400,
                    Errors = new List<string> { "Файл порожній" }
                };
            try
            {
                using (Bitmap bmp = new Bitmap(uploadedImage.OpenReadStream()))
                {
                    var saveImage = ImageWorker.CreateImage(bmp, 600, 337);
                    int idProduct = (from v in _context.Games orderby v.Id descending select v).FirstOrDefault().Id;
                    if (saveImage != null)
                    {
                        saveImage.Save(path, ImageFormat.Jpeg);
                        var product = _context.Games.Find(idProduct);

                        _context.Games.Find(idProduct).Image4 = fileName;

                        _context.SaveChanges();
                    }
                }
            }
            catch (Exception ex)
            {
                return new ResultDTO
                {
                    Status = 400,
                    Errors = new List<string> { "Не вдалося завантажити файл" },
                    Message = ex.InnerException.Message
                };
            }

            return new ResultDTO
            {
                Status = 200
            };

        }

        [HttpPost("RemoveImage/{name}")]
        public ResultDTO RemoveImage([FromRoute] string name)
        {
            try
            {
                string path = _appEnvironment.ContentRootPath + @"\ClientApp\src\assets\img\";

                System.IO.File.Delete(Path.Combine(path, name));

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

        [HttpPost("RemoveProduct/{id}")]
        public ResultDTO RemoveProduct([FromRoute] int id)
        {
            try
            {
                var product = _context.Games.FirstOrDefault(t => t.Id == id);
                var minsystemRequirementsProduct = _context.MinSystemRequirements.FirstOrDefault(t => t.Id == id);
                var recsystemRequirementsProduct = _context.RecSystemRequirements.FirstOrDefault(t => t.Id == id);
                _context.Games.Remove(product);
                foreach (var item in _context.GameGanres)
                {
                    if (item.GanreId == id)
                    {
                        _context.GameGanres.Remove(item);
                    }
                }
                foreach (var item in _context.GameLangauges)
                {
                    if (item.GameId == id)
                    {
                        _context.GameLangauges.Remove(item);
                    }
                }
                if (minsystemRequirementsProduct != null)
                {
                    _context.MinSystemRequirements.Remove(minsystemRequirementsProduct);
                }
                if (recsystemRequirementsProduct != null)
                {
                    _context.RecSystemRequirements.Remove(recsystemRequirementsProduct);
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


        [HttpGet("getProduct/{id}")]
        public GameFullItemDTO getProduct([FromRoute] string id)
        {

            List<GameFullItemDTO> data = new List<GameFullItemDTO>();
            var dataFormDB = _context.Games.ToList();
            GameFullItemDTO temp = new GameFullItemDTO();
            foreach (var item in dataFormDB)
            {
                if (item.Id == int.Parse(id))
                {

                    temp.Id = item.Id;
                    temp.Name = item.Name;
                    temp.Description = item.Description;
                    temp.Developer = item.Developer;
                    temp.Publisher = item.Publisher;
                    temp.Evaluation = item.Evaluation;
                    temp.Price = item.Price;
                    temp.ImageHead = item.ImageHead;
                    temp.Image1 = item.Image1;
                    temp.Image2 = item.Image2;
                    temp.Image3 = item.Image3;
                    temp.Image4 = item.Image4;
                    temp.Data = item.Data;
                    break;
                }

            }
            return temp;
        }

        [HttpGet("getSysReqMin/{id}")]
        public SystemRequirementsItemDTo getSysReqMin([FromRoute] string id)
        {

            List<SystemRequirementsItemDTo> data = new List<SystemRequirementsItemDTo>();
            var dataFormDB = _context.MinSystemRequirements.ToList();
            SystemRequirementsItemDTo temp = new SystemRequirementsItemDTo();
            foreach (var item in dataFormDB)
            {
                if (item.Id == int.Parse(id))
                {

                    temp.Graphics = item.Graphics;
                    temp.Memory = item.Memory;
                    temp.OS = item.OS;
                    temp.Processor = item.Processor;
                    temp.Storege = item.Storege;
                    break;
                }

            }
            return temp;
        }
        [HttpGet("getSysReqRec/{id}")]
        public SystemRequirementsItemDTo getSysReqRec([FromRoute] string id)
        {

            List<SystemRequirementsItemDTo> data = new List<SystemRequirementsItemDTo>();
            var dataFormDB = _context.RecSystemRequirements.ToList();
            SystemRequirementsItemDTo temp = new SystemRequirementsItemDTo();
            foreach (var item in dataFormDB)
            {
                if (item.Id == int.Parse(id))
                {

                    temp.Graphics = item.Graphics;
                    temp.Memory = item.Memory;
                    temp.OS = item.OS;
                    temp.Processor = item.Processor;
                    temp.Storege = item.Storege;
                    break;
                }

            }
            return temp;
        }

        [HttpGet("getLanguagesGame/{id}")]
        public IEnumerable<LanguagesItemDTO> getLanguagesGame([FromRoute] string id)
        {

            List<LanguagesItemDTO> data = new List<LanguagesItemDTO>();
            var dataFormDB = _context.Languages.ToList();

            var dataFromDBCom = _context.GameLangauges.ToList();
            List<int> list = new List<int>();
            foreach (var item in dataFromDBCom)
            {
                if (item.GameId == int.Parse(id))
                    list.Add(item.LanguageId);
            }
            for(int i=0;i<list.Count();i++)
            {
                LanguagesItemDTO temp = new LanguagesItemDTO();
                temp.nameLanguage = dataFormDB[list[i]-1].Name;
                temp.idLanguage = dataFormDB[list[i]-1].Id;
                temp.isChecked = true;
                data.Add(temp);
            }


            return data;
        }

        [HttpGet("getGanreGame/{id}")]
        public IEnumerable<GanreItemDTO> getGanreGame([FromRoute] string id)
        {

            List<GanreItemDTO> data = new List<GanreItemDTO>();
            var dataFormDB = _context.Ganres.ToList();

            var dataFromDBCom = _context.GameGanres.ToList();
            List<int> list = new List<int>();
            foreach (var item in dataFromDBCom)
            {
                if (item.GameId == int.Parse(id))
                    list.Add(item.GanreId);
            }
            for (int i = 0; i < list.Count(); i++)
            {
                GanreItemDTO temp = new GanreItemDTO();
                temp.nameCategory = dataFormDB[list[i]-1].Name;
                temp.idCategory = dataFormDB[list[i]-1].Id;
                temp.isChecked = true;
                data.Add(temp);
            }


            return data;
        }

        [HttpGet("getPopular")]
        public IEnumerable<GameItemDTO> getPopular([FromRoute] string id)
        {
            List<GameItemDTO> data = new List<GameItemDTO>();
            var dataFormDB = _context.Games.ToList();
            var dataFormDBUG = _context.UserGames.ToList();
            int i = 0;

            Dictionary<int, int> games = new Dictionary<int, int>();
            foreach (var item in dataFormDB)
            {
                games.Add(item.Id, 0);
            }
            foreach (var item in games)
            {
                foreach (var itemUG in dataFormDBUG)
                {
                    if(item.Key == itemUG.GameId)
                    {
                        games[item.Key] += 1;
                    }
                }
            }

            foreach (var pair in games.OrderByDescending(pair => pair.Value))
            {
                GameItemDTO temp = new GameItemDTO();
                var product = _context.Games.FirstOrDefault(t => t.Id == pair.Key);
                temp.CompanyName = product.Developer;
                temp.Data = product.Data;
                temp.Id = product.Id;
                temp.Image = product.ImageHead;
                temp.Name = product.Name;
                temp.Price = product.Price;
                i++;
                data.Add(temp);
                if (i == 8)
                    break;
            }


            return data;
        }

        [HttpGet("getNews")]
        public IEnumerable<GameItemDTO> getNews([FromRoute] string id)
        {
            List<GameItemDTO> data = new List<GameItemDTO>();
            var dataFormDB = _context.Games.ToList();
            DateTime thisDay = DateTime.Today;

            foreach (var item in dataFormDB)
            {
                if (item.Data > thisDay && thisDay.AddDays(-32) < thisDay)
                {
                    GameItemDTO temp = new GameItemDTO();

                    temp.CompanyName = item.Developer;
                    temp.Data = item.Data;
                    temp.Id = item.Id;
                    temp.Image = item.ImageHead;


                    temp.Name = item.Name;
                    temp.Price = item.Price;

                    data.Add(temp);
                }
            }

            return data;
        }

        [HttpPost("editProduct")]
        public ResultDTO editProduct(GameEditDTO model)
        {
            try
            {
                var product = _context.Games.FirstOrDefault(t => t.Id == int.Parse(model.Id));
                var dataFormDBL = _context.GameLangauges.ToList();
                var dataFormDBC = _context.GameGanres.ToList();

                foreach (var item in dataFormDBL)
                {
                    if (item.GameId == int.Parse(model.Id))
                        _context.GameLangauges.Remove(item);
                }


                foreach (var item in dataFormDBC)
                {
                    if (item.GameId == int.Parse(model.Id))
                        _context.GameGanres.Remove(item);
                }

                _context.SaveChanges();
                foreach (var item in model.listIdLang)
                {

                    GameLangauges temp = new GameLangauges();

                    temp.GameId = int.Parse(model.Id);
                    temp.LanguageId = item;

                    _context.GameLangauges.Add(temp);
                }


                foreach (var item in model.listIdCateg)
                {

                    GameGanres temp = new GameGanres();

                    temp.GameId = int.Parse(model.Id);
                    temp.GanreId = item;

                    _context.GameGanres.Add(temp);
                }
                _context.SaveChanges();

                if (model.Name != null)
                    product.Name = model.Name;
                if (model.Description != null)
                    product.Description = model.Description;
                if (model.Evaluation != null)
                    product.Evaluation = model.Evaluation;
                if (model.Price != null)
                    product.Price = model.Price;
                if (model.Developer != null)
                    product.Developer = model.Developer;
                if (model.Publisher != null)
                    product.Publisher = model.Publisher;
                if (model.Data != null)
                    product.Data = model.Data;

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

        [HttpPost("editRecSysReq")]
        public ResultDTO editRecSysReq(SystemRequirementsEditDTO model)
        {
            try
            {
                var product = _context.RecSystemRequirements.FirstOrDefault(t => t.Id == int.Parse(model.Id));

                if (model.Graphics != null)
                    product.Graphics = model.Graphics;
                if (model.Memory != null)
                    product.Memory = model.Memory;
                if (model.OS != null)
                    product.OS = model.OS;
                if (model.Processor != null)
                    product.Processor = model.Processor;
                if (model.Storege != null)
                    product.Storege = model.Storege;

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

        [HttpPost("editMinSysReq")]
        public ResultDTO editMinSysReq(SystemRequirementsEditDTO model)
        {
            try
            {
                var product = _context.MinSystemRequirements.FirstOrDefault(t => t.Id == int.Parse(model.Id));

                if (model.Graphics != null)
                    product.Graphics = model.Graphics;
                if (model.Memory != null)
                    product.Memory = model.Memory;
                if (model.OS != null)
                    product.OS = model.OS;
                if (model.Processor != null)
                    product.Processor = model.Processor;
                if (model.Storege != null)
                    product.Storege = model.Storege;

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

        [HttpPost("buyProduct")]
        public ResultDTO buyProduct(List<string> id)
        {
            try
            {

                var userGames = new UserGames()
                {
                    UserId = id[0],
                    GameId = int.Parse(id[1])
                };

                _context.UserGames.Add(userGames);
                _context.SaveChanges();

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

        [HttpPost("addLanguage")]
        public async Task<ResultDTO> addLanguage(string name) {

            if (name!=null)
            {
                return new ResultDTO
                {
                    Status = 500,
                    Message = "Error",
                    Errors = Validation.GetErrorsByModel(ModelState)
                };
            }
            else
            {
                var lang = new Language()
                {
                    Name = name,

                };
                _context.Languages.Add(lang);
                _context.SaveChanges();

                return new ResultDTO
                {
                    Status = 200
                };
            }

            }
        [HttpPost("RemoveLanguage/{id}")]
        public ResultDTO RemoveLanguage([FromRoute] int id) {
        
        try
            {
                var Language = _context.Languages.FirstOrDefault(t => t.Id == id);
                _context.Languages.Remove(Language);

                foreach (var item in _context.GameLangauges)
                {
                    if (item.LanguageId == id)
                    {
                        _context.GameLangauges.Remove(item);
                    }
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

        [HttpPost("addGanre")]
        public async Task<ResultDTO> addGanre(string name) {

            if (name != null)
            {
                return new ResultDTO
                {
                    Status = 500,
                    Message = "Error",
                    Errors = Validation.GetErrorsByModel(ModelState)
                };
            }
            else
            {
                var ganre = new Ganre()
                {
                    Name = name,

                };
                _context.Ganres.Add(ganre);
                _context.SaveChanges();

                return new ResultDTO
                {
                    Status = 200
                };
            }

        }
        [HttpPost("RemoveGanre/{id}")]
        public ResultDTO RemoveGanre([FromRoute] int id) {

            try
            {
                var Ganre = _context.Ganres.FirstOrDefault(t => t.Id == id);
                _context.Ganres.Remove(Ganre);

                foreach (var item in _context.GameGanres)
                {
                    if (item.GameId == id)
                    {
                        _context.GameGanres.Remove(item);
                    }
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

        [HttpGet("getPopularGanreForAdmin")]
        public IEnumerable<GanrePopularDTO> getPopularGanreForAdmin()
        {

            List<GanrePopularDTO> data = new List<GanrePopularDTO>();
            var dataFormDB = _context.Ganres.ToList();
            var dataFormDBGG = _context.GameGanres.ToList();

            int i = 0;
            Dictionary<int, int> ganres = new Dictionary<int, int>();
            foreach (var item in dataFormDB)
            {
                ganres.Add(item.Id, 0);
            }
            foreach (var item in ganres)
            {
                foreach (var itemGG in dataFormDBGG)
                {
                    if (item.Key == itemGG.GanreId)
                    {
                        ganres[item.Key] += 1;
                    }
                }
            }

            foreach (var pair in ganres.OrderByDescending(pair => pair.Value))
            {
                GanrePopularDTO temp = new GanrePopularDTO();
                var product = _context.Ganres.FirstOrDefault(t => t.Id == pair.Key);
                i++;
                temp.Name = product.Name;
                temp.Games = pair.Value;

                data.Add(temp);
                if (i == 16)
                    break;
            }


            return data;

        }
        [HttpGet("getPopularGameForAdmin")]
        public IEnumerable<GameSalesDTO> getPopularGameForAdmin()
        {

            List<GameSalesDTO> data = new List<GameSalesDTO>();
            var dataFormDB = _context.Games.ToList();
            var dataFormDBUG = _context.UserGames.ToList();
            int i = 0;

            Dictionary<int, int> games = new Dictionary<int, int>();
            foreach (var item in dataFormDB)
            {
                games.Add(item.Id, 0);
            }
            foreach (var item in games)
            {
                foreach (var itemUG in dataFormDBUG)
                {
                    if (item.Key == itemUG.GameId)
                    {
                        games[item.Key] += 1;
                    }
                }
            }

            foreach (var pair in games.OrderByDescending(pair => pair.Value))
            {
                GameSalesDTO temp = new GameSalesDTO();
                var product = _context.Games.FirstOrDefault(t => t.Id == pair.Key);
                temp.Id = product.Id;
                temp.Image = product.ImageHead;
                temp.Name = product.Name;
                temp.Price = product.Price;
                temp.Sales = pair.Value;
                i++;
                data.Add(temp);
                if (i == 16)
                    break;
            }


            return data;

        }
        [HttpGet("getAveragePriceForAdmin")]
        public double getAveragePriceForAdmin()
        {
            double price = 0;
            int count = 0;
            var dataFormDB = _context.Games.ToList();

            foreach (var item in dataFormDB)
            {
                price += item.Price;
                count++;
            }

            return Math.Round( price/count, 2);
        }
        [HttpGet("getLowestPriceForAdmin")]
        public double getLowestPriceForAdmin()
        {
            double price = 0;
            var dataFormDB = _context.Games.ToList();
            int i = 0;
            foreach(var item in dataFormDB)
            {
                if (i == 0)
                {
                    price = item.Price;
                    i++;
                }

                if(price<item.Price)
                {
                    price = item.Price;
                }

            }

            return price;
        }
        [HttpGet("getHighestPriceForAdmin")]
        public double getHighestPriceForAdmin()
        {
            double price=0;
            var dataFormDB = _context.Games.ToList();
            int i = 0;
            foreach (var item in dataFormDB)
            {
                if (i == 0)
                {
                    price = item.Price;
                    i++;
                }

                if (price > item.Price)
                {
                    price = item.Price;
                }

            }
            return price;
        }
        [HttpGet("getSalesPriceForAdmin")]
        public double getSalesPriceForAdmin()
        {
            double price = 0;
            var dataFormDB = _context.UserGames.ToList();

            foreach (var item in dataFormDB)
            {
                var product = _context.Games.FirstOrDefault(t => t.Id == item.GameId);
                price += product.Price;
            }

            return price;
        }
        [HttpGet("getCountSalesPriceForAdmin")]
        public double getCountSalesPriceForAdmin()
        {
            int count = 0;
            var dataFormDB = _context.UserGames.ToList();

            foreach (var item in dataFormDB)
            {
                count++;
            }

            return count;
        }

        [HttpGet("getCountUserForAdmin")]
        public int getCountUserForAdmin()
        {
            int count = 0;
            var dataFormDB = _context.Users.ToList();

            foreach (var item in dataFormDB)
            {
                count++;
            }

            return count;
        }

        [HttpGet("getCountGameForAdmin")]
        public int getCountGameForAdmin()
        {
            int count = 0;
            var dataFormDB = _context.Games.ToList();

            foreach (var item in dataFormDB)
            {
                count++;
            }

            return count;
        }


    }

}
