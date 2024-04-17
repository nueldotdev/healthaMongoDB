
// Staff Event listener
var staffNxt = staffScreen.querySelector('#nextBtn');
var staffPrev = staffScreen.querySelector('#prevBtn');

staffNxt.addEventListener('click', () => {
    console.log(staffNxt)
    const pageSwitch = document.querySelector('.active.off #paginationSwitch');

    const totalPages = Math.ceil(allStaff.length / 20);
    if (currentPage < totalPages) {
        currentPage++;
        updateTables('staff-screen', allStaff, currentPage, pageSwitch.checked);
        updatePaginationInfo('staff-screen', allStaff);
    }
});

staffPrev.addEventListener('click', () => {
    const pageSwitch = document.querySelector('.active.off #paginationSwitch');

    if (currentPage > 1) {
        currentPage--;
        updateTables('staff-screen', allStaff, currentPage, pageSwitch.checked);
        updatePaginationInfo('staff-screen', allStaff);
    }
});

// Patient event listener
var patientNext = patientScreen.querySelector('#nextBtn');
var patientPrev = patientScreen.querySelector('#prevBtn');

patientPrev.addEventListener('click', () => {
            const pageSwitch = document.querySelector('.active.off #paginationSwitch');

    if (currentPage > 1) {
        currentPage--;
        updateTables('patient-screen', allPatients, currentPage, pageSwitch.checked);
        updatePaginationInfo('patient-screen', allPatients);
    }
});

// Event listener for next button
patientNext.addEventListener('click', () => {
    const pageSwitch = document.querySelector('.active.off #paginationSwitch');

    const totalPages = Math.ceil(allPatients.length / 20);
    if (currentPage < totalPages) {
        currentPage++;
        updateTables('patient-screen', allPatients, currentPage, pageSwitch.checked);
        updatePaginationInfo('patient-screen', allPatients);
    }
});


//  Register event listener
var registerNext = registerScreen.querySelector('#nextBtn');
var registerPrev = registerScreen.querySelector('#prevBtn');


registerPrev.addEventListener('click', () => {
    const pageSwitch = document.querySelector('.active.off #paginationSwitch');

    if (currentPage > 1) {
        currentPage--;
        updateTables('register-screen', allReg, currentPage, pageSwitch.checked);
        updatePaginationInfo('register-screen', allReg);
    }
});

// Event listener for next button
registerNext.addEventListener('click', () => {
    const totalPages = Math.ceil(allReg.length / 20);
    const pageSwitch = document.querySelector('.active.off #paginationSwitch');

    if (currentPage < totalPages) {
        currentPage++;
        updateTables('register-screen', allReg, currentPage, pageSwitch.checked);
        updatePaginationInfo('register-screen', allReg);
    }
});



function searchList(list, searchTerm, activePage) {
    // Convert searchTerm to lowercase for case-insensitive search
    const searchTermLower = searchTerm.toLowerCase();

    // Initialize an empty array to store search results
    const searchResults = [];

    // Iterate over each object in the list
    list.forEach(item => {
        // Convert each object's properties to an array of values
        const values = Object.values(item);

        // Check if any of the values contain the search term
        const match = values.some(value => {
            // Convert each value to lowercase for case-insensitive search
            const valueLower = typeof value === 'string' ? value.toLowerCase() : value.toString().toLowerCase();
            return valueLower.includes(searchTermLower);
        });

        // If any value matches the search term, add the object to the search results
        if (match) {
            searchResults.push(item);
        }
    });
    const pageSwitch = document.querySelector('.staff-screen #paginationSwitch');
    window.alert("Search ran")
    updateTables(activePage, searchResults, currentPage, pageSwitch.checked)
    window.alert("Search done")

    
    return searchResults;
}


// Search functionality
// var regSearch = registerScreen.querySelector('#search-form');
// var staffSearch = staffScreen.querySelector('#search-form');
var allSearchFor = document.querySelectorAll('#search-form');

allSearchFor.forEach((element) => {
    element.addEventListener('submit', (event) => {
        event.preventDefault();
        let searchQuery = element.querySelector('input').value.trim().toLowerCase();

        let activePage = document.querySelector('.active.off');
        let array;
        let active;

        if (activePage.id == 'register-screen') {
            array = allReg
        } else if (activePage.id == 'staff-screen') {
            array = allStaff
        } else if (activePage.id == 'patient-screen') {
            array =  allPatients
        }

        searchList(array, searchQuery, activePage.id);
    })
})