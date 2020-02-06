// 1. Select the Form
const form = document.getElementById('loginForm');

// 2. Listen for submit
form.addEventListener('submit', handleLogin);

$(document).ready(function() {
    if (localStorage.getItem('loggedIn')) {

    } else {
        window.location = '/';
    }

    $.ajax({
        method: 'GET',
        url: '/api/show',
        contentType: "application/json",
        headers: {
            withCredentials: true,
        },
        success: showSuccess,
        error: error => console.log(error),
    });
});

function showSuccess(response) {
    console.log(response);
    $('#thatFirstName').html(`${response.firstName}`);
    $('#thatLastName').html(`${response.lastName}`);
    $('#thatEmail').html(`${response.email}`);
}

function handleLogin(event) {
    // 2. Prevent page refresh
    event.preventDefault();
    isFormValid = true;

    document.querySelectorAll('.alert').forEach((alert) => alert.remove())

    // 3. Select form elements
    const userEmail = document.getElementById('email');
    const userPassword = document.getElementById('password');

    // 3. Select form VALUES (specifically)
    const userData = {
        email: userEmail.value,
        password: userPassword.value,
    };

    // 4. Validate Values
    const formInputs = [...form.elements];
    formInputs.forEach((input) => {
        if (input.type !== 'submit' && input.value === '') {
            isFormValid = false;
            input.classList.add('inputError');
            input.insertAdjacentHTML('afterend', `
            <div class="alert">
                <p>Please ${input.placeholder}</p>
            </div>
            `);
        }
        else if (input.type === 'password' && input.value.length < 4) {
            isFormValid = false;
            input.classList.add('inputError');
            input.insertAdjacentHTML('afterend', `
            <div class="alert pt-0">
                <p>Password must be at least 4 characters</p>
            </div>
            `);
        }


    });

    // 5. OnSuccess function to delete User
    function onSuccess() {
        event.preventDefault();
        window.location = '/';
    };

    if (isFormValid) {
        console.log('Delete form is valid!');

        $.ajax({
            method: 'DELETE',
            url: '/api/delete',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(userData),
            success: onSuccess,
            error: error => console.log(error),
        });
    };
};

$('#updateButton').on('click', () => {
    event.preventDefault();
    console.log('clicked!');

    const firstName = document.getElementById('update-first-name');
    const lastName = document.getElementById('update-last-name');
    const email = document.getElementById('update-email');

    const userData = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
    };

    console.log(userData);

    $.ajax({
        method: 'PUT',
        url: '/api/update',
        contentType: "application/json",
        headers: {
            withCredentials: true,
        },
        data: JSON.stringify(userData),
        success: response => console.log(response),
        error: error => console.log(error),
    });
});