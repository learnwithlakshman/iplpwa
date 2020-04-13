
const registerBtn = document.querySelector("#registerBtn");

registerBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const registerForm = document.querySelector("#registerForm");
    let email = registerForm.email.value;
    let fullName = registerForm.fullName.value;
    let password = registerForm.password.value;

    const data = { email: email, fullname: fullName, password: password };
    registerUser(data)

})


function registerUser(data) {
    fetch('https://indipl2020.herokuapp.com/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            alert("registration successfull");
            window.location.href = "/login.html";
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("registration failed");
        });
}