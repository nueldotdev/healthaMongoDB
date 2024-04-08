
async function makeRequest(endpoint, method, data) {
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
}


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

    // window.alert(formData);

    function clearForm() {
        staffForm.querySelector('input[name="id"]').value = ""; // Assuming you have an input field with name "id" for the record ID
        staffForm.querySelector('input[name="name"]').value = "";
        staffForm.querySelector('select[name="gender"]').selectedIndex = 0;
        staffForm.querySelector('input[name="role"]').value = '';
        staffForm.querySelector('input[name="department"]').value = '';
        staffForm.querySelector('input[name="email"]').value = '';
        staffForm.querySelector('input[name="contact"]').value = '';
    }

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
            makeRequest(`/api/staff/${id}`, "PUT", newStaff)
        } else {
            clearForm()
        }

    } else {
        const confirmed = window.confirm(`You want to Add to database: Name: ${name}, Role: ${role}`);
        if (confirmed) {
            makeRequest('/api/staff', "POST", newStaff)
        } else {
            clearForm()
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

    // window.alert(formData);

    function clearForm() {
        regForm.querySelector('input[name="id"]').value = ""; // Assuming you have an input field with name "id" for the record ID
        regForm.querySelector('input[name="name"]').value = "";
        regForm.querySelector('select[name="gender"]').selectedIndex = 0;
        regForm.querySelector('select[name="is_patient"]').selectedIndex = 0;
        regForm.querySelector('input[name="age"]').value = '';
        regForm.querySelector('input[name="address"]').value = '';
        regForm.querySelector('input[name="email"]').value = '';
        regForm.querySelector('input[name="contact"]').value = '';
    }

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
        name,
        gender,
        age,
        address,
        is_patient,
        contact,
        date
    };
    console.log(newReg)

    if (id) {
        record = allReg.find(item => item._id == id)
        const confirmed = window.confirm(`You want to Edit in database: \n\nName: ${record.name} => ${name}, \n\nRole: ${record.role} => ${role} \n\n Gender: ${record.gender} => ${gender} \n\nDepartment: ${record.department} => ${department} \n\nEmail: ${record.email} => ${email} \n\nContact: ${record.contact} => ${contact} \n\n`);
        if (confirmed) {
            makeRequest(`/api/registers/${id}`, "PUT", newReg)
        } else {
            clearForm()
        }

    } else {
        const confirmed = window.confirm(`You want to Add to database: Name: ${name}, Role: ${role}`);
        if (confirmed) {
            makeRequest('/api/registers', "POST", newReg)
        } else {
            clearForm()
        }
    }
    
});


// NOTE: Check clearform()


// function clearForm(param) {
//     const inFields = param.querySelectorAll('input');
//     inFields.forEach(element => {
//         element.value = '';
//     });
//     const selFields = param.querySelectorAll('select');
//     selFields.forEach(element => {
//         element.selectedIndex = 0;
//     });
// }