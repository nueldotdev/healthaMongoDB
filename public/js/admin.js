window.addEventListener("DOMContentLoaded", () => {
    restoreActiveSection();

    getReg();
    getPatients();
    getStaff();
})


// Our list of collections
let allPatients = [];
let allStaff = [];
let allReg = [];
let allPayment = [];
let currentPage = 1




// 
// 
// 



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

// let cont = actionAreaBtn.innerText.toLowerCase().split(' ')
// cont = cont[1]
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

const getPatients = async () => {
    try {
        const response = await fetch('/api/patients');
        allPatients = await response.json();
        const pageSwitch = document.querySelector('.active.off #paginationSwitch');
        updateTables('patient-screen', allPatients, currentPage, pageSwitch.checked);
        updatePaginationInfo('patient-screen', allPatients);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    console.log("List =>", allPatients)
}

// Fetch staff data from the backend API
const getStaff = async () => {
    try {
        const response = await fetch('/api/staff');
        allStaff = await response.json();
        const pageSwitch = document.querySelector('.active.off #paginationSwitch');
        updateTables('staff-screen', allStaff ,currentPage, pageSwitch.checked);
        updatePaginationInfo('staff-screen', allStaff);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Fetch register data from the backend API
const getReg = async () => {
    try {
        const response = await fetch('/api/registers');
        allReg = await response.json();
        const pageSwitch = document.querySelector('.active.off #paginationSwitch');
        updateTables('register-screen', allReg, currentPage, pageSwitch.checked);
        updatePaginationInfo('register-screen', allReg);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}







const refreshPatients = document.querySelectorAll("#rf-btn")

refreshPatients.forEach((rfElement) => {
    rfElement.addEventListener("click", () => {
        rfpState = rfElement.nextElementSibling
        rfElement.style.animation = "rotate 1s infinite";
        rfpState.textContent = "Getting...";
        getReg();
        getPatients();
        getStaff();
        setTimeout(function () {
            rfpState.textContent = "Up to date";
            rfElement.style.animation = "none";
        }, 2000);
        setTimeout(function () {
            rfpState.textContent = "";
        }, 4000)
    });
})


const tgleBtn = document.querySelectorAll(".dropdown-toggle");
const tgleSection = document.querySelectorAll(".dropdown-menu");
const tgleSectionBtns = document.querySelectorAll(".dropdown-item");
const actionAreaBtns = document.querySelectorAll("#activeActionBtn");

tgleBtn.forEach((buttons) => {
    buttons.addEventListener("click", () => {
        let exactToggle = document.querySelector(".active.off .dropdown-menu");

        exactToggle.classList.toggle("active");
        buttons.classList.toggle("open");
    })
})
tgleSectionBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        let other = btn.parentElement
        let label = document.querySelector(".active.off #activeActionBtn");
        let dropdown = document.querySelector(".active.off .dropdown-toggle");


        other.classList.remove("active")
        dropdown.classList.remove('open')
        label.innerHTML = btn.innerHTML
    })
})


actionAreaBtns.forEach((actionAreaBtn) => {
    actionAreaBtn.addEventListener("click", () => {
        const currentAction = actionAreaBtn.textContent.trim();
        const screen = actionAreaBtn.closest(".active.off");
        const label = screen.querySelector(".dropdown-toggle");

        console.log("AAB => ", screen)
        // Perform action based on the current action label
        switch (currentAction) {
            case "Add":
                // Code to handle add action
                console.log("Add action clicked");
                break;
            case "Edit":
                // Code to handle search action
                console.log("Edit action clicked");
                break;
            case "Delete":
                // Code to handle delete action
                console.log("Delete action clicked");
                break;
            default:
                console.log("Unknown action");
        }

        // Update the label if needed
        // label.innerHTML = currentAction;
    });
});


/*
* Don't forget to decide either to create a form for each action or one form within each screen
* Make sure to refactor most of the code that is unnecessary.
* setAction() should be called when the button is clicked 
* This applies to both the buttons within the list and the selected action button

* setAction('add', 'patients')
* When delete is selected, is should show a checkmark for each item in the table
* and a delete button should be displayed in the action area
* the selected item(s) should be deleted when the button is clicked

* I might decide to make the actionAreaBtn the final button to be clicked when a form is filled or
* items to be deleted are selected
*/

// This should hold forms
document.getElementById('staffForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    
    const formData = new FormData(event.target);
    const staffData = {
        name: formData.get('name'),
        role: formData.get('role'),
        contact: formData.get('contact'),
        email: formData.get('email'),
        department: formData.get('department'),
        is_active: true // Assuming is_active is always true
    };
    
    try {
        const response = await fetch('/api/staff', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(staffData)
        });
        if (response.ok) {
            console.log('Staff data submitted successfully');
            // Optionally, you can redirect the user to another page or display a success message
        } else {
            console.error('Failed to submit staff data');
            // Optionally, you can display an error message to the user
        }
    } catch (error) {
        console.error('Error submitting staff data:', error);
        // Optionally, you can display an error message to the user
    }
});




const setAction =  async (action, collection) => {

    // Get the active screen
    const activeScreen = document.querySelector(`.active.off.${collection}`);

    // Perform action based on the current action label
        switch (action) {
            case "add":
                // Code to handle add action
                const addForm = document.getElementById("add-form");
                addForm.style.display = "block";
                // create a new addition to the collection which is derived from the current active screen
                const inputs = activeScreen.querySelectorAll(".active.off input");
                inputs.forEach((input) => {
                    const name = input.name;
                    const value = input.value;
                    collection[name] = value;
                });
                break;
            case "edit":
                // Code to handle edit action
                const editForm = document.getElementById("edit-form");
                editForm.style.display = "block";
                break;
            case "delete":
                // Code to handle delete action
                // Delete the item from the collection
                const id = document.querySelector(".active.off input[name=id]").value;
                const response = await fetch(`/api/${collection}/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: id }),
                });
        }
}

const allPageSwitch = document.querySelectorAll('#paginationSwitch');
// Implementing Pagination
allPageSwitch.forEach((pageSwitch) => {
    pageSwitch.addEventListener('click', () => {

        const page = pageSwitch.getAttribute('data-page');
        const paginate = pageSwitch.checked;
        console.info(`Page: ${page}, Paginate: ${paginate}`);

        const parent = pageSwitch.closest(".active.off");
        if (parent.classList.contains('staff')) {
            updateTables(page, allStaff, currentPage, paginate);
        } else if (parent.classList.contains('patients')) {
            updateTables(page, allPatients, currentPage, paginate);
        } else if (parent.classList.contains('registers')) {
            updateTables(page, allReg, currentPage, paginate);
        }
    });
});

// Function to update table with data for the current page
function updateTables(page, array, pageNo, paginate) {
    const startIndex = (pageNo - 1) * 5;
    const endIndex = startIndex + 5;
    const pageList = paginate ? array.slice(startIndex, endIndex) : array;
    // const patientTableBody = document.getElementById('patientBody');
    const bodyParent = document.querySelector(`.${page}`);
    const tableBody = bodyParent.querySelector(`tbody`);

    tableBody.innerHTML = ''; // Clear existing table rows

    if (bodyParent.classList.contains("staff-screen")) {
        pageList.forEach((staff, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${staff.name}</td>
                <td>${staff.role}</td>
                <td>${staff.department}</td>
                <td>${staff.email}</td>
                <td>${staff.contact}</td>`

            console.assert("Row created")
            tableBody.appendChild(row);
            console.assert("Row Added")
        });
    } else if (bodyParent.classList.contains("patient-screen")) {
        pageList.forEach(patient => {
            const row = document.createElement('tr');
    
            // Create table cells for each patient attribute
            row.innerHTML = `
            <td>${patient.registration_id}</td>
            <td>${patient.name}</td>
            <td>${patient.age}</td>
            <td>${patient.gender}</td>
            <td>${patient.department}</td>
            <td>${patient.status}</td>`
    
            // Append the row to the table body
            tableBody.appendChild(row);
            // allPatients.push(patient);
        });
    } else if (bodyParent.classList.contains("register-screen")) {
        pageList.forEach(patient => {
            const dateObject = new Date(patient.date);

            // Extract year, month, and day from the Date object
            const year = dateObject.getFullYear();
            // Add 1 to getMonth() because it returns a zero-based index (0 for January)
            const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
            const day = dateObject.getDate().toString().padStart(2, '0');

            // Construct the formatted date string in "yyyy-mm-dd" format
            const formattedDate = `${year}-${month}-${day}`;

            const row = document.createElement('tr');
    
            // Create table cells for each patient attribute
            row.innerHTML = `
            <td>${patient.registration_id}</td>
            <td>${patient.name}</td>
            <td>${patient.age}</td>
            <td>${patient.gender}</td>
            <td>${patient.is_patient}</td>
            <td>${formattedDate}</td>`
    
            // Append the row to the table body
            tableBody.appendChild(row);
            // allPatients.push(patient);
        });
    }
}



// Function to update pagination information (current page and total pages)
function updatePaginationInfo(page, array) {
    const screen = document.querySelector(`.${page}`)
    const totalPages = Math.ceil(array.length / 5);

    screen.querySelector('#currentPage').textContent = currentPage;
    screen.querySelector('#totalPages').textContent = totalPages;
}

// Event listener for previous button
document.querySelector('.staff-screen #prevBtn').addEventListener('click', () => {
            const pageSwitch = document.querySelector('.active.off #paginationSwitch');

    if (currentPage > 1) {
        currentPage--;
        updateTables('staff-screen', allStaff, currentPage, pageSwitch.checked);
        updatePaginationInfo('staff-screen', allStaff);
    }
});

// Event listener for next button
document.querySelector('.staff-screen #nextBtn').addEventListener('click', () => {
            const pageSwitch = document.querySelector('.active.off #paginationSwitch');

    const totalPages = Math.ceil(allStaff.length / 5);
    if (currentPage < totalPages) {
        currentPage++;
        updateTables('staff-screen', allStaff, currentPage, pageSwitch.checked);
        updatePaginationInfo('staff-screen', allStaff);
    }
});

document.querySelector('.patient-screen #prevBtn').addEventListener('click', () => {
            const pageSwitch = document.querySelector('.active.off #paginationSwitch');

    if (currentPage > 1) {
        currentPage--;
        updateTables('patient-screen', allPatients, currentPage, pageSwitch.checked);
        updatePaginationInfo('patient-screen', allPatients);
    }
});

// Event listener for next button
document.querySelector('.patient-screen #nextBtn').addEventListener('click', () => {
    const pageSwitch = document.querySelector('.active.off #paginationSwitch');

    const totalPages = Math.ceil(allPatients.length / 5);
    if (currentPage < totalPages) {
        currentPage++;
        updateTables('patient-screen', allPatients, currentPage, pageSwitch.checked);
        updatePaginationInfo('patient-screen', allPatients);
    }
});



document.querySelector('.register-screen #prevBtn').addEventListener('click', () => {
    const pageSwitch = document.querySelector('.active.off #paginationSwitch');

    if (currentPage > 1) {
        currentPage--;
        updateTables('register-screen', allReg, currentPage, pageSwitch.checked);
        updatePaginationInfo('register-screen', allReg);
    }
});

// Event listener for next button
document.querySelector('.register-screen #nextBtn').addEventListener('click', () => {
    const totalPages = Math.ceil(allReg.length / 5);
    const pageSwitch = document.querySelector('.active.off #paginationSwitch');

    if (currentPage < totalPages) {
        currentPage++;
        updateTables('register-screen', allReg, currentPage, pageSwitch.checked);
        updatePaginationInfo('register-screen', allReg);
    }
});