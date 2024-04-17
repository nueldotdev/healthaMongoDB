
async function makeRequest(endpoint, method, data, form) {
    try {
        const response = await fetch(endpoint, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log('Request successful:', responseData);
            // Show success message using window alert
            window.alert('Request successful: ' + JSON.stringify(responseData));
        } else {
            console.error('Request failed:', response.statusText);
            // Show error message using window alert
            window.alert('Request failed: ' + response.statusText);
        }
    } catch (error) {
        console.error('Error making request:', error);
        // Show error message using window alert
        window.alert('Error making request: ' + error.message);
    }

    clearForm(form)
    getDocs();
}

function registerID() {
    // Generate a random number between 100000 and 999999
    return Math.floor(Math.random() * 900000) + 100000;
}

// Example usage:
const regID = registerID();



staffForm.addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevent the default form submission

    // Get form data
    const formData = new FormData(staffForm);
    const id = formData.get('id');
    const name = formData.get('name');
    const gender = formData.get('gender');
    const role = formData.get('role');
    const department = formData.get('department');
    const email = formData.get('email');
    const contact = formData.get('contact');

    // Create a new staff object
    const newStaff = id ? {
        id,
        name,
        gender,
        role,
        department,
        email,
        contact
    } : {
        name,
        gender,
        role,
        department,
        email,
        contact
    };
    console.log(newStaff)

    if (id) {
        record = allStaff.find(item => item._id == id)
        const confirmed = window.confirm(`You want to Edit in database: \n\nName: ${record.name} => ${name}, \n\nRole: ${record.role} => ${role} \n\n Gender: ${record.gender} => ${gender} \n\nDepartment: ${record.department} => ${department} \n\nEmail: ${record.email} => ${email} \n\nContact: ${record.contact} => ${contact} \n\n`);
        if (confirmed) {
            makeRequest(`/api/staff/${id}`, "PUT", newStaff, staffForm)
        } else {
            clearForm(staffForm)
        }

    } else {
        const confirmed = window.confirm(`You want to Add to database: Name: ${name}, Role: ${role}`);
        if (confirmed) {
            makeRequest('/api/staff', "POST", newStaf, staffForm)
        } else {
            clearForm(staffForm)
        }
    }
    
});


regForm.addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevent the default form submission

    // Get form data
    const formData = new FormData(regForm);
    const id = formData.get('id');
    const name = formData.get('name');
    const gender = formData.get('gender');
    const age = formData.get('age');
    const address = formData.get('address');
    const is_patient = formData.get('is_patient');
    const contact = formData.get('contact');
    const date = new Date().toISOString();
    const registration_id = registerID();

    // Create a new staff object
    const newReg = id ? {
        id,
        name,
        gender,
        age,
        address,
        is_patient,
        contact,
        date
    } : {
        registration_id,
        name,
        gender,
        age,
        address,
        is_patient,
        contact
    };
    console.log(newReg)

    if (id) {
        record = allReg.find(item => item._id == id)
        const confirmed = window.confirm(`You want to Edit in database: \n\nName: ${record.name} => ${name} \n\nGender: ${record.gender} => ${gender} \n\nAddress: ${record.address} => ${address} \n\nAge: ${record.age} => ${age} \n\nContact: ${record.contact} => ${contact} \n\n`);
        if (confirmed) {
            makeRequest(`/api/registers/${id}`, "PUT", newReg, regForm)
        } else {
            clearForm(regForm)
        }

    } else {
        const confirmed = window.confirm(`You want to Add to database: \n\nName: ${newReg.name}\n\nGender: ${newReg.gender}\n\nAddress: ${newReg.address}\n\nIs Patient: ${newReg.is_patient}\n\nAge: ${newReg.age}\n\nContact: ${newReg.contact}\n\n`);
        if (confirmed) {
            makeRequest('/api/registers', "POST", newReg, regForm)
        } else {
            clearForm(regForm)
        }
    }
    
});


// NOTE: Check clearform()


function clearForm(param) {
    const inFields = param.querySelectorAll('input');
    inFields.forEach(element => {
        element.value = '';
    });
    const selFields = param.querySelectorAll('select');
    selFields.forEach(element => {
        element.selectedIndex = 0;
    });

    param.querySelector('input[name="id"]').value = "";
}
