let labels = [];

function getUserNameFromToken() {
    const base64Token = getToken().split(".")[1];
    let userName = JSON.parse(window.atob(base64Token)).sub;
    return userName;
}
function checkValidToken() {

}
function getToken() {
    return localStorage.getItem('userToken');
}

function getHeadersData() {
    const headersInfo = new Headers();
    headersInfo.append('Content-Type', 'application/json');
    headersInfo.append('Authorization', `Bearer ${getToken()}`);
    return headersInfo;
}
const showPlayerInformation = function (players) {
    let tableData = document.querySelector("#tableData");
    let data = `<table class='table table-striped'>
                    <tr>
                        <th>Name</th>
                        <th>Label</th>
                        <th>Role</th>
                        <th>Price</th>
                    <tr>
                `;
    players.forEach(p => {
        data += `<tr>
                    <td>${p.name}</td><td>${p.label}</td><td>${p.role}</td><td>${p.price}</td>
                 </tr>
                `
    })
    data += `</table>`
    document.querySelector("#tableData").innerHTML = data;
}
const showTeamDetailInformation = (team) => {
    console.log(team);
    let url = `https://indipl2020.herokuapp.com/ipl2020/team/${team}`;
    fetch(url, {
        method: 'GET',
        headers: getHeadersData(),
    })
        .then(response => {
            return response.json();
        }).then(json => {
            showPlayerInformation(json);
        }).catch(error => {
            console.error(error);
        })
}

const showTeamInfo = () => {
    let team = document.querySelector("#idSelect").value;
    if (team !== "") {
        showTeamDetailInformation(team);
    }
}
const showLabels = () => {
    let data = `<select class='form-control' id="idSelect" onchange=showTeamInfo()>`
    data += `<option value=''>Select Team</option>`;
    labels.forEach(ele => {
        data += `<option value='${ele}'>${ele}</option>`;
    })
    data += '</select>';
    document.querySelector("#idLabels").innerHTML = data;

}

const labelInfo = () => {
    fetch("https://indipl2020.herokuapp.com/ipl2020/team/labels", {
        method: 'GET',
        headers: getHeadersData(),
    })
        .then(response => {
            return response.json();
        }).then(json => {
            labels = json.labels;
            showLabels();
        }).catch(error => {
            console.error(error);
        })
}


logout.addEventListener('click', (event) => {
    localStorage.removeItem('userToken');
    window.location.href = "index.html";
})

function loadDashboard() {
    if (getToken()) {
        labelInfo();
        document.querySelector("#userName").textContent = getUserNameFromToken();
        const logout = document.querySelector("#logout");
    } else {
        alert("Please login again");
        window.location.href = "login.html";
    }
}

loadDashboard();
