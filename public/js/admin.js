window.addEventListener("DOMContentLoaded", () => {
    restoreActiveSection();

    getPatients();
    getStaff();
})


// Our list of collections
let allPatients = [];
let allStaff = [];
let allReg = [];
let allPayment = [];
let currentPage = 1










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
        updateTables('patient-screen', allPatients, currentPage);
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
        updateTables('staff-screen', allStaff ,currentPage);
        updatePaginationInfo('staff-screen', allStaff);
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
        let exactToggle = buttons.parentElement
        exactToggle = exactToggle.nextElementSibling

        exactToggle.classList.toggle("active");
        buttons.classList.toggle("open");
    })
})
tgleSectionBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        let subject = btn.parentElement
        subject = subject.previousElementSibling
        subject = subject.children

        let other = btn.parentElement
        let label = subject[0]
        let dropdown = subject[1]

        // tgleSection.forEach((one) => one.classList.remove("active"));
        // tgleBtn.forEach((button) => {
        //     button.classList.remove("open");
        // })
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
        // switch (currentAction) {
        //     case "Add":
        //         // Code to handle add action
        //         console.log("Add action clicked");
        //         break;
        //     case "Search":
        //         // Code to handle search action
        //         console.log("Search action clicked");
        //         break;
        //     case "Delete":
        //         // Code to handle delete action
        //         console.log("Delete action clicked");
        //         break;
        //     default:
        //         console.log("Unknown action");
        // }

        // Update the label if needed
        // label.innerHTML = currentAction;
    });
});






// Implementing Pagination
// Function to update table with data for the current page
function updateTables(page, array, pageNo) {
    const startIndex = (pageNo - 1) * 5;
    const endIndex = startIndex + 5;
    const pageList = array.slice(startIndex, endIndex);
    // const patientTableBody = document.getElementById('patientBody');
    const bodyParent = document.querySelector(`.${page}`);
    const tableBody = bodyParent.querySelector(`tbody`);
    console.log("Body => ", tableBody);
    console.log("Aray => ", array);
    console.log("pageNo => ", pageNo);
    
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
    if (currentPage > 1) {
        currentPage--;
        updateTables('staff-screen', allStaff, currentPage);
        updatePaginationInfo('staff-screen', allStaff);
    }
});

// Event listener for next button
document.querySelector('.staff-screen #nextBtn').addEventListener('click', () => {
    const totalPages = Math.ceil(allStaff.length / 5);
    if (currentPage < totalPages) {
        currentPage++;
        updateTables('staff-screen', allStaff, currentPage);
        updatePaginationInfo('staff-screen', allStaff);
    }
});
