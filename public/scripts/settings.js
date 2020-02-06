// 1. Select the Form
const form = document.getElementById('loginForm');

// 2. Listen for submit
form.addEventListener('submit', handleLogin);

$(document).ready(function() {
    if (localStorage.getItem('loggedIn')) {

    } else {
        window.location = '/';
    }
});

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
        else if (input.type === 'password' && input.value.length < 7) {
            isFormValid = false;
            input.classList.add('inputError');
            input.insertAdjacentHTML('afterend', `
            <div class="alert pt-0">
                <p>Password must be at least 7 characters</p>
            </div>
            `);
        }


    });

    // 5. OnSuccess function to delete User
    function onSuccess() {

      $.ajax({
          method: 'DELETE',
          url: '/api/login',
          contentType: 'application/json; charset=utf-8',
          data: JSON.stringify(userData),
          success: console.log(userData),
          error: error => console.log(error),
      });
    }

    if (isFormValid) {
        console.log('Submitting User Data -->', userData);

        $.ajax({
            method: 'POST',
            url: '/api/login',
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
        headers: {
            withCredentials: true,
            contentType: "application/json",
        },
        data: JSON.stringify(userData),
        success: response => console.log(response),
        error: error => console.log(error),
    });
});