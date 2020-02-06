console.log('login.js ready to go!');

/* GAME PLAN
1 - Select the Form
2 - Listen for submit & prevent default
3 - Get form values
4 - Validate values
5 - Submit request if valid
6 - Redirect to Login on success
*/

// 1. Select the Form
const form = document.getElementById('loginForm');

// 2. Listen for submit
form.addEventListener('submit', handleLogin);

function handleLogin(event) {
    // 2. Prevent page refresh
    event.preventDefault();
    isFormValid = true;
    $('#emailHelp').remove();
    $('#passwordHelp').remove();

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
        input.classList.remove('inputError');

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
            <div class="alert p-0">
                <p>Password must be at least 4 characters</p>
            </div>
            `);
        }
    });


    if (isFormValid) {
            console.log(userData);
            $.ajax({
                method: 'POST',
                url: '/api/login',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(userData),
                success: onSuccess,
                error: onError,
            });
    };
};



function onSuccess(response) {
    localStorage.setItem('loggedIn', true);
    window.location = '/profile';
};

function onError(response) {
$('#loginForm').prepend(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
  Email or Password doesn't check out bruh! <strong> Enter Valid Creds </strong>
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>`)

}
