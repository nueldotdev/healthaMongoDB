window.addEventListener("DOMContentLoaded", () => {
    restoreActiveSection();

    getDocs();
})



async function getDocs() {
    getReg();
    getPatients();
    getStaff();
}



// Our list of collections
let allPatients = [];
let allStaff = [];
let allReg = [];
let allPayment = [];
let currentPage = 1
let everything = [allPatients,allStaff,allPayment,allReg]

// // searc barrrrr
// // Function to handle the search operation
// function handleSearch(event) {
//     event.preventDefault(); // Prevent default form submission behavior
    
//     // Get the search query from the input field
//     const searchQuery = document.querySelector('#search-form input').value.trim().toLowerCase();
    
//     // Check if search query is not empty
//     if (searchQuery !== '') {
//         // Perform search operation
//         const searchResults = performSearch(everything, searchQuery); // Pass the array and search query
    
//         // Display search results
//         displaySearchResults(searchResults);
//     } else {
//         // If search query is empty, clear previous search results
//         const searchResultsContainer = document.querySelector('#search-results');
//         searchResultsContainer.innerHTML = '';
//     }
// }

// function performSearch(everything, query) {
//     const searchResults = everything.filter(item => {
//         // Check if item is defined and has the 'name' property
//         if (item && typeof item.name === 'string') {
//             // Convert name to lowercase and check if it includes the query
//             return item.name.toLowerCase().includes(query.toLowerCase());
//         }
//         return false; // If item is undefined or name is not a string, return false
//     });
    
//     return searchResults;
// }

// // Define a function to display search results
// function displaySearchResults(results) {
//     // Get a reference to the search results container
//     const searchResultsContainer = document.querySelector('#search-results');
   
//     // Check if the search results container exists
//     if (searchResultsContainer) {
//         // Clear previous search results if any
//         searchResultsContainer.innerHTML = '';

//         // Display search results
//         results.forEach(result => {
//             const resultElement = document.createElement('div');
//             // Customize the content based on your array structure
//             resultElement.textContent = result.age; // Assuming 'name' is the property to display
//             searchResultsContainer.appendChild(resultElement);
//         });
//     } else {
//         console.error("Search results container not found.");
//     }
// }

// // Add event listener to the search form
// document.querySelector('#search-form').addEventListener('submit', handleSearch);



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

// Forms 

const regForm = registerScreen.querySelector(".main-form-all#regForm form");
const staffForm = staffScreen.querySelector(".main-form-all#staffForm form");

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



// Fetch patient data from the backend API

const getPatients = async () => {
    try {
        const response = await fetch('/api/patients');
        allPatients = await response.json();
        const pageSwitch = document.querySelector('.patient-screen #paginationSwitch');
        const pagControls = document.querySelector('.patient-screen #pagination');

        if (pageSwitch.checked) {
            pagControls.style.display = 'flex';
        } else {
            pagControls.style.display = 'none';
        }
        
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
        const pageSwitch = document.querySelector('.staff-screen #paginationSwitch');
        const pagControls = document.querySelector('.staff-screen #pagination');

        if (pageSwitch.checked) {
            pagControls.style.display = 'flex';
        } else {
            pagControls.style.display = 'none';
        }

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
        const pageSwitch = document.querySelector('.register-screen #paginationSwitch');
        const pagControls = document.querySelector('.staff-screen #pagination');

        if (pageSwitch.checked) {
            pagControls.style.display = 'flex';
        } else {
            pagControls.style.display = 'none';
        }

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
        getDocs();
        setTimeout(function () {
            rfpState.textContent = "Up to date";
            rfElement.style.animation = "none";
        }, 2000);
        setTimeout(function () {
            rfpState.textContent = "";
        }, 4000)
    });
})


// Event delegation for delete and edit buttons
const btnsForEdit =  document.querySelectorAll(".edit-btn")
const btnsForDel =  document.querySelectorAll(".delete-btn")
const tables = document.querySelectorAll("table");

tables.forEach((table) => {
    table.addEventListener('click', () => {
        const target = event.target;
        if (target.classList.contains('edit-btn')) {
            const documentId = target.getAttribute('data-id');
            console.log('Edit document with ID:', documentId);
            // Implement edit logic using the documentId
        }
        if (target.classList.contains('delete-btn')) {
            const documentId = target.getAttribute('data-id');
            console.log('Delete document with ID:', documentId);
            // Implement delete logic using the documentId
        }
    })
})


var record;


// Function for edit, should bring up a table to edit the info (will take from data-attr of the button)
function editRecord(event) {
    const button = event.target.closest('button.edit-btn');
    if (button) {
        const params = button.dataset.id;
        const collection = button.dataset.collection;
        let mainForm;
        

        console.log("Params:", params);
        console.log("Collection:", collection);

        if (collection == "staff") {
            record = allStaff.find(item => item._id == params);
            // mainForm = staffForm;


            staffForm.querySelector('input[name="id"]').value = record._id; // Assuming you have an input field with name "id" for the record ID
            staffForm.querySelector('input[name="name"]').value = record.name;
            staffForm.querySelector('select[name="gender"]').value = record.gender;
            staffForm.querySelector('input[name="role"]').value = record.role;
            staffForm.querySelector('input[name="department"]').value = record.department;
            staffForm.querySelector('input[name="email"]').value = record.email;
            staffForm.querySelector('input[name="contact"]').value = record.contact;

            // Scroll to the form
            staffForm.scrollIntoView({ behavior: 'smooth' });
        } else if (collection == "patients") {
            record = allPatients.find(item => item._id == params);
            // record = allPatients.find(item => item._id == "65fdd424f94c421d463d98ef");
            console.info("Patients Record:", record);
        } else if (collection == "registers") {
            record = allReg.find(item => item._id == params);

            if (record.gender.toLowerCase() == 'male') {
                regForm.querySelector('select[name="gender"]').selectedIndex = 1;
            } else {
                regForm.querySelector('select[name="gender"]').selectedIndex = 2;
            }

            if (record.is_patient == true) {
                regForm.querySelector('select[name="is_patient"]').selectedIndex = 0;
            } else {
                regForm.querySelector('select[name="is_patient"]').selectedIndex = 1;
            }
            
            regForm.querySelector('input[name="id"]').value = record._id; // Assuming you have an input field with name "id" for the record ID
            regForm.querySelector('input[name="name"]').value = record.name;
            // regForm.querySelector('select[name="gender"]').value = record.gender;
            regForm.querySelector('input[name="age"]').value = record.age;
            regForm.querySelector('input[name="address"]').value = record.address;
            // regForm.querySelector('select[name="is_patient"]').value = record.is_patient;
            regForm.querySelector('input[name="contact"]').value = record.contact;

            regForm.scrollIntoView({ behavior: 'smooth' });
        }

        console.log("Final Record:", record);
        console.log(`Edit ${params} from ${collection}`);

     
    }
}


//  Function for delete -> Initiated when delete icon clicked, it takess from the data-attr of the button
async function delRecord(event) {
    const button = event.target.closest('button.delete-btn');
    if (button) {
        const params = button.dataset.id;
        const collection = button.dataset.collection;
        let record;

        console.log("Params:", params);
        console.log("Collection:", collection);

        if (params) {
            if (collection === "staff") {
                record = allStaff.find(item => item._id === params);
                console.info("Staff Record:", record);
            } else if (collection === "patients") {
                record = allPatients.find(item => item._id === params);
                console.info("Patients Record:", record);
            } else if (collection === "registers") {
                record = allReg.find(item => item._id === params);
                console.info("Registers Record:", record);
            }
    
            const confirmed = window.confirm(`Are you sure you want to delete the following; \n\nName: ${record.name}, \nRole: ${record.role} \n\n From the database?`);
            if (confirmed) {
                try {
                    const response = await fetch(`/api/${collection}/${params}`, {
                        method: 'DELETE'
                    });
    
                    if (!response.ok) {
                        throw new Error(`Failed to delete ${collection}`);
                    }
    
                    // Remove the corresponding row from the table or update UI as needed
                    getDocs();
                    // Handle success response
                    window.alert(`${collection} deleted successfully`);
                    console.log(`${collection} deleted successfully`);
                } catch (error) {
                    console.error(`Error deleting ${collection}:`, error);
                    window.alert(`Failed to delete ${collection}`);
                }
            }
    
        }
            
    }
}


const allPageSwitch = document.querySelectorAll('#paginationSwitch');
allPageSwitch.forEach((pageSwitch) => {
    pageSwitch.addEventListener('change', () => {
        const page = pageSwitch.getAttribute('data-page');
        const paginate = pageSwitch.checked;

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
    const pagControls = document.querySelector('.active.off #pagination');

    if (paginate) {
        pagControls.style.display = 'flex';
    } else {
        pagControls.style.display = 'none';
        // Show all data without pagination
        pageList = array;
    }

    const startIndex = (pageNo - 1) * 20;
    const endIndex = startIndex + 20;
    const pageList = paginate ? array.slice(startIndex, endIndex) : array;
    // const patientTableBody = document.getElementById('patientBody');
    const bodyParent = document.querySelector(`.${page}`);
    const tableBody = bodyParent.querySelector(`tbody`);

    tableBody.innerHTML = ''; // Clear existing table rows

    if (bodyParent.classList.contains("staff-screen")) {
        pageList.forEach((staff, index) => {
            const row = document.createElement('tr');
            let id = `${staff.id}`
            console.log(`ID => ${id}`)

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${staff.name}</td>
                <td>${staff.role}</td>
                <td>${staff.department}</td>
                <td>${staff.email}</td>
                <td>${staff.contact}</td>
                <td>
                    <button class="edit-btn" data-id="${staff._id}" data-collection="staff" onclick="editRecord(event)">
                    <i class="fa-regular fa-pen-to-square"></i>
                    </button>
                    <button class="delete delete-btn" data-id="${staff._id}" data-collection="staff" onclick="delRecord(event)">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>`

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
            <td>${patient.status}</td>
            <td>
                <button class="edit-btn"  data-id="${patient._id}" data-collection="patients" onclick="editRecord(event)">
                <i class="fa-regular fa-pen-to-square"></i>
                </button>
                <button class="delete delete-btn"  data-id="${patient._id}" data-collection="patients" onclick="delRecord(event)">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </td>`
    
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
            <td>${formattedDate}</td>
            <td>
                <button class="edit-btn" data-id="${patient._id}" data-collection="registers" onclick="editRecord(event)">
                <i class="fa-regular fa-pen-to-square"></i>
                </button>
                <button class="delete delete-btn"  data-id="${patient._id}" data-collection="registers" onclick="delRecord(event)">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </td>`
    
            // Append the row to the table body
            tableBody.appendChild(row);
            // allPatients.push(patient);
        });
    }
}



// Function to update pagination information (current page and total pages)
function updatePaginationInfo(page, array) {
    const screen = document.querySelector(`.${page}`)
    const totalPages = Math.ceil(array.length / 20);
    // updateTables()

    screen.querySelector('#currentPage').textContent = currentPage;
    screen.querySelector('#totalPages').textContent = totalPages;
}

// // Event listener for previous button
// document.querySelector('.staff-screen #prevBtn').addEventListener('click', () => {
//     const pageSwitch = document.querySelector('.active.off #paginationSwitch');

//     if (currentPage > 1) {
//         currentPage--;
//         updateTables('staff-screen', allStaff, currentPage, pageSwitch.checked);
//         updatePaginationInfo('staff-screen', allStaff);
//     }
// });

// // Event listener for next button
// var staffNxt = staffScreen.querySelector('#nextBtn');
// staffNxt.addEventListener('click', () => {
//     console.log(staffNxt)
//     const pageSwitch = document.querySelector('.active.off #paginationSwitch');

//     const totalPages = Math.ceil(allStaff.length / 20);
//     if (currentPage < totalPages) {
//         currentPage++;
//         updateTables('staff-screen', allStaff, currentPage, pageSwitch.checked);
//         updatePaginationInfo('staff-screen', allStaff);
//     }
// });

// document.querySelector('.patient-screen #prevBtn').addEventListener('click', () => {
//             const pageSwitch = document.querySelector('.active.off #paginationSwitch');

//     if (currentPage > 1) {
//         currentPage--;
//         updateTables('patient-screen', allPatients, currentPage, pageSwitch.checked);
//         updatePaginationInfo('patient-screen', allPatients);
//     }
// });

// // Event listener for next button
// document.querySelector('.patient-screen #nextBtn').addEventListener('click', () => {
//     const pageSwitch = document.querySelector('.active.off #paginationSwitch');

//     const totalPages = Math.ceil(allPatients.length / 20);
//     if (currentPage < totalPages) {
//         currentPage++;
//         updateTables('patient-screen', allPatients, currentPage, pageSwitch.checked);
//         updatePaginationInfo('patient-screen', allPatients);
//     }
// });



// document.querySelector('.register-screen #prevBtn').addEventListener('click', () => {
//     const pageSwitch = document.querySelector('.active.off #paginationSwitch');

//     if (currentPage > 1) {
//         currentPage--;
//         updateTables('register-screen', allReg, currentPage, pageSwitch.checked);
//         updatePaginationInfo('register-screen', allReg);
//     }
// });

// // Event listener for next button
// document.querySelector('.register-screen #nextBtn').addEventListener('click', () => {
//     const totalPages = Math.ceil(allReg.length / 20);
//     const pageSwitch = document.querySelector('.active.off #paginationSwitch');

//     if (currentPage < totalPages) {
//         currentPage++;
//         updateTables('register-screen', allReg, currentPage, pageSwitch.checked);
//         updatePaginationInfo('register-screen', allReg);
//     }
// });