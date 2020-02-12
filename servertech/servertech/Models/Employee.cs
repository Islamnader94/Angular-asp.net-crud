using System;
using System.Text.Json.Serialization;

namespace servertech.Models
{
    public class Employee
    {
        public int id { get; set; }
        public string name { get; set; }
        public string department { get; set; }
        public bool status { get; set; }
        public int? DepartmentID { get; set; }

        [JsonIgnore]
        public virtual Department Department { get; set; }

        public Employee() { }
    }
}
