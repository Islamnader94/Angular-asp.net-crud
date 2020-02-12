using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using servertech.Data;
using servertech.Models;

namespace servertech.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DepartmentController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public DepartmentController(ApplicationDbContext db)
        {
            _db = db;
        }

        //Action Methods
        [HttpGet]
        public IActionResult GetDepartment()
        {
            return Ok(_db.Departments.ToList());
        }

        [HttpPost]
        public async Task<IActionResult> AddDepartments([FromBody] Department objDepartment)
        {
            if (!ModelState.IsValid)
            {
                return new JsonResult("Error while creating new department");
            }
            _db.Departments.Add(objDepartment);
            await _db.SaveChangesAsync();

            return new JsonResult("Department added successfully");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDepartment([FromRoute] int id, [FromBody] Department objDepartment)
        {
            if (objDepartment == null || id != objDepartment.id)
            {
                return new JsonResult("Department was not found");
            }
            else
            {
                _db.Departments.Update(objDepartment);
                await _db.SaveChangesAsync();
                return new JsonResult("Department updated successfully");
            }

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDepartment([FromRoute] int id)
        {
            var findDepartment = await _db.Departments.FindAsync(id);
            if (findDepartment == null)
            {
                return NotFound();
            }
            else
            {
                _db.Departments.Remove(findDepartment);
                await _db.SaveChangesAsync();
                return new JsonResult("Department deleted successfully");
            }
        }

    }
}
