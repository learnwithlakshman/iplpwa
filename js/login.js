const loginBtn = document.querySelector("#loginBtn");

function storeToken(token) {
    localStorage.setItem('userToken', token);
}

loginBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const loginForm = document.querySelector("#loginForm");
    let email = loginForm.email.value;
    let pwd = loginForm.password.value;
    const data = { username: email, password: pwd };
    authenticate(data);
})

function authenticate(data) {
    fetch('https://indipl2020.herokuapp.com/authenticate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            let token = data.token;
            if (token) {
                storeToken(token);
                window.location.replace("landingpage.html");
            } else {
                document.querySelector("#msg").innerHTML = '<h4 class="text-danger">Invalid Login </h4>';
            }
        })
        .catch((error) => {
            document.querySelector("#msg").innerHTML = '<h4 class="text-danger">Invalid Login </h4>';
        });
}