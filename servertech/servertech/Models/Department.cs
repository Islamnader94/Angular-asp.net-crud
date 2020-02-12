using System;
using System.Collections.Generic;

namespace servertech.Models
{
    public class Department
    {
        public int id { get; set; }
        public string department_name { get; set; }
        public virtual ICollection<Employee> Employees { get; set; }
        public Department() { }
    }

}
