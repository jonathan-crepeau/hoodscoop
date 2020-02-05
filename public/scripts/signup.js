$("#submitBtn").click(handleSignupSubmit);

const form = document.getElementsByClassName('signupForm');

function handleSignupSubmit() {
  event.preventDefault();

  const firstName = document.getElementById('first-name');
  const lastName = document.getElementById('last-name');
  const email = document.getElementById('email');
  const password = document.getElementById('password');

  const userData = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value
  }

  // const formInputs = [...form.elements];
  //
  //
  //
  // formInputs.forEach((input) => {
  //     if (input.type !== 'submit' && input.value === '') {
  //         isFormValid = false;
  //         input.classList.add('inputError');
  //         input.insertAdjacentHTML('afterend', `
  //         <div class="alert pt-0">
  //             <p>Please ${input.placeholder}</p>
  //         </div>
  //         `);
  //     }
  //     else if (input.type === 'password' && input.value.length < 4) {
  //         isFormValid = false;
  //         input.classList.add('inputError');
  //         input.insertAdjacentHTML('afterend', `
  //         <div class="alert pt-0">
  //             <p>Password must be at least 4 characters</p>
  //         </div>
  //         `);
  //     }
  // });

  alert("Hello\nHow are you?");

  console.log(userData);

  $.ajax({
    method: "POST",
    url: '/api/submitForm',
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(userData),
    success : function(result) {
      console.log(result); // result is an object which is created from the returned JSON
    }
  })
}
