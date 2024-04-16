
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