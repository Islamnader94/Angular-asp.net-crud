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
    public class EmployeeController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public EmployeeController(ApplicationDbContext db)
        {
            _db = db;
        }

        //Action Methods
        [HttpGet]
        public IActionResult GetEmployees()
        {
            return Ok(_db.Employees.ToList());
        }

        [HttpPost]
        public async Task<IActionResult> AddEmployees([FromBody] Employee objEmployee)
        {
            if (!ModelState.IsValid)
            {
                return new JsonResult("Error while creating new employee");
            }
            _db.Employees.Add(objEmployee);
            await _db.SaveChangesAsync();

            return new JsonResult("Employee added successfully");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee([FromRoute] int id, [FromBody] Employee objEmployee)
        {
            if (objEmployee == null || id != objEmployee.id)
            {
                return new JsonResult("Employee was not found");
            }
            else
            {
                _db.Employees.Update(objEmployee);
                await _db.SaveChangesAsync();
                return new JsonResult("Employee updated successfully");
            }

        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee([FromRoute] int id)
        {
            var findEmployee = await _db.Employees.FindAsync(id);
            if (findEmployee == null)
            {
                return NotFound();
            }
            else
            {
                findEmployee.status = false;
                _db.Employees.Update(findEmployee);
                await _db.SaveChangesAsync();
                return new JsonResult("Employee deleted successfully");
            }

        }

    }
}
