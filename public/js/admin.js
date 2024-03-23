
//  Sidenav buttons
const theButtons = document.querySelectorAll(".li-btn");

theButtons.forEach((tab) => {
    tab.addEventListener("click", handleTabClick);
});


// Dashboard screens
const title = document.querySelector('.screen-title');
const dashboardScreen = document.getElementById("dashboard-screen");
const registerScreen = document.getElementById("register-screen");
const patientScreen = document.getElementById("patient-screen");
const staffScreen = document.getElementById("staff-screen");
const paymentScreen = document.getElementById("payment-screen");

const listItems = document.querySelectorAll(".li-btn");
const divs = document.querySelectorAll(".main-contained > div");


function handleTabClick(event) {
    const clickedTab = event.target;
    const targetDivId = clickedTab.getAttribute("data-target");
    const targetDiv = document.getElementById(targetDivId);
  
    // Remove "active" class from all tabs and divs
    listItems.forEach((item) => item.classList.remove("active"));
    divs.forEach((div) => div.classList.remove("active"));
  
    // Set the title text
    title.textContent = clickedTab.textContent;
  
    // Add "active" class to the clicked tab and its corresponding div
    clickedTab.classList.add("active");
    targetDiv.classList.add("active");
    
    // We store the new active page in local storage
    storeActiveSection(targetDivId);
}




// Here's the code to make it store the current active page for reload
// Here we store the active page with local storage
function storeActiveSection(sectionId) {
    localStorage.setItem('activeSection', sectionId);
}

// Here we receive the active pagefrom local storage if itt exists
function getActiveSection() {
    return localStorage.getItem('activeSection');
}

// And on here we restore the active page by targeting it's corresponding list-btn and trggering a click
function restoreActiveSection() {
    const activeSectionId = getActiveSection();
    if (activeSectionId) {
        const activeTab = document.querySelector(`[data-target="${activeSectionId}"]`);
        if (activeTab) {
            activeTab.click(); // Trigger click to show the active section
        }
    }
}

// Add click event listeners to tabs
listItems.forEach((tab) => {
    tab.addEventListener("click", handleTabClick);
});

// Restore the active section on page load
restoreActiveSection();



// Fetch patient data from the backend API
fetch('/api/patients')
    .then(response => response.json())
    .then(patients => {
        const patientTableBody = document.querySelector('#patientTable tbody');

        // Clear existing table rows
        patientTableBody.innerHTML = '';

        // Iterate over each patient object and create a table row for each
        patients.forEach(patient => {
            const row = document.createElement('tr');

            // Create table cells for each patient attribute
            const registrationIdCell = document.createElement('td');
            registrationIdCell.textContent = patient.registration_id;
            row.appendChild(registrationIdCell);

            const nameCell = document.createElement('td');
            nameCell.textContent = patient.name;
            row.appendChild(nameCell);

            const ageCell = document.createElement('td');
            ageCell.textContent = patient.age;
            row.appendChild(ageCell);

            const genderCell = document.createElement('td');
            genderCell.textContent = patient.gender;
            row.appendChild(genderCell);

            const emailCell = document.createElement('td');
            emailCell.textContent = patient.email;
            row.appendChild(emailCell);
            
                       
            const departmentCell = document.createElement('td');
            departmentCell.textContent = patient.department;
            row.appendChild(departmentCell);
            
            const statusCell = document.createElement('td');
            statusCell.textContent = patient.status;
            row.appendChild(statusCell);

            // Append the row to the table body
            patientTableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });



// Fetch staff data from the backend API
fetch('/api/staff')
    .then(response => response.json())
    .then(staffs => {
        const staffTableBody = document.querySelector('#staffTable tbody');

        // Clear existing table rows
        staffTableBody.innerHTML = '';

        // Iterate over each staff object and create a table row for each
        staffs.forEach((staff, index)=> {
            const row = document.createElement('tr');

            // Create table cells for each staff attribute
            const numberCell = document.createElement('td');
            numberCell.textContent = index + 1; // Add 1 to index to start numbering from 1
            row.appendChild(numberCell);
            
            const nameCell = document.createElement('td');
            nameCell.textContent = staff.name;
            row.appendChild(nameCell);

            const roleCell = document.createElement('td');
            roleCell.textContent = staff.role;
            row.appendChild(roleCell);

            const departmentCell = document.createElement('td');
            departmentCell.textContent = staff.department;
            row.appendChild(departmentCell);

            const emailCell = document.createElement('td');
            emailCell.textContent = staff.email;
            row.appendChild(emailCell);                       
            
            const contactCell = document.createElement('td');
            contactCell.textContent = '+' + staff.contact;
            row.appendChild(contactCell);

            // Append the row to the table body
            staffTableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });


