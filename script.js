class Employee {
  constructor(id, name, email, phone, address,position, salary) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.phone = phone;
      this.address = address;
      this.position = position;
      this.salary = salary;
  }
}

class EmployeeManager {
  constructor() {
    this.employees = [];
    
    // Flag for email tracking
    this.currentUpdateEmail = null; 
  }

  isExitEmail(email) {
    return this.employees.find(employee => employee.email === email)
  }

  // Add or Update Employee
  createEmployee(name, email, phone, address,position, salary) {
    if (this.currentUpdateEmail) {
        
        // Update existing employee by email
          this.updateEmployeeByEmail(this.currentUpdateEmail, name, phone, address , position, salary);
      } else {

        // Check email already exists
          const isExitEmail = this.isExitEmail(email)
          if (isExitEmail) {
              alert("Địa chỉ email của nhân viên đã tồn tại");
              return;
      }
      
        // Create new employee
          const countId = this.employees.length + 1
          const newEmployee = new Employee(
            countId,
              name,
              email,
              phone,
              address,
              position,
              salary
          );
          this.employees.push(newEmployee);
      }
      this.createTable();
  }

  // Update employee details using email
  updateEmployeeByEmail(email, name,  phone, address,position, salary) {
      const employee = this.employees.find(emp => emp.email === email);
      if (employee) {
          employee.name = name;
          employee.position = position;
          employee.salary = salary;
          employee.phone = phone;
          employee.address = address;
          this.currentUpdateEmail = null; // Reset the current email
      }
  }

  // Delete employee by email
  deleteEmployee(email) {
      this.employees = this.employees.filter(emp => emp.email !== email);
      this.createTable();
  }

  // Edit employee by email
  editEmployee(email) {
      const employee = this.employees.find(emp => emp.email === email);
      if (employee) {
          document.getElementById('name').value = employee.name;
          document.getElementById('position').value = employee.position;
          document.getElementById('salary').value = employee.salary;
          document.getElementById('email').value = employee.email;
          document.getElementById('phone').value = employee.phone;
        document.getElementById('address').value = employee.address;

        // Disable fields email
        document.getElementById('email').disabled = true;
        document.querySelector("button[type='submit']").innerText = "Update Employee";
        
        // Tracking employee email -> update information (exclude email)
        this.currentUpdateEmail = email; 
      }
  }

  // 
  createTable() {
      const tbody = document.querySelector("#employeeTable tbody");
      tbody.innerHTML = ""; // Clear previous rows

      this.employees.forEach(employee => {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td>${employee.id}</td>
              <td>${employee.name}</td>
              <td>${employee.email}</td>
              <td>${employee.phone}</td>
              <td>${employee.address}</td>
              <td>${employee.position}</td>
              <td>${employee.salary}</td>
              <td>
                  <button onclick="employeeManager.editEmployee('${employee.email}')">Edit</button>
                  <button onclick="employeeManager.deleteEmployee('${employee.email}')">Delete</button>
              </td>
          `;
          tbody.appendChild(row);
      });

      // Reset the form 
      document.getElementById("employeeForm").reset();
      document.querySelector("button[type='submit']").innerText = "Add Employee";

     // Enable field email 
      document.getElementById('email').disabled = false; 
  }
}

// Initialize EmployeeManager class
const employeeManager = new EmployeeManager();

// Handle form submission
document.getElementById("employeeForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const position = document.getElementById("position").value;
  const salary = document.getElementById("salary").value;

  employeeManager.createEmployee(name, email, phone, address,position,salary);
});
