const theButtons = document.querySelectorAll(".li-btn");


theButtons.forEach((tab) => {
    tab.addEventListener("click", handleTabClick);
});


// Accessing the elements
const title = document.querySelector('.screen-title');
const dashboardScreen = document.getElementById("dashboard-screen");
// const displayCards = document.getElementById("home-main");
const registerScreen = document.getElementById("register-screen");
const patientScreen = document.getElementById("patient-screen");
const staffScreen = document.getElementById("staff-screen");
const paymentScreen = document.getElementById("payment-screen");



// Get references to the elements
const listItems = document.querySelectorAll(".li-btn");
const divs = document.querySelectorAll(".main-contained > div");



function handleTabClick(event) {
    const clickedTab = event.target;
    const targetDivId = clickedTab.getAttribute("data-target");
    const targetDiv = document.getElementById(targetDivId);
  
    // Remove "active" class from all tabs and divs
    listItems.forEach((item) => item.classList.remove("active"));
    divs.forEach((div) => div.classList.remove("active"));
    title.textContent = `${clickedTab.textContent}`
  
    // Add "active" class to the clicked tab and its corresponding div
    clickedTab.classList.add("active");
    targetDiv.classList.add("active");
}