let labels = [];


function getUserNameFromToken(){

}
function checkValidToken(){

}
function getToken(){

}
function storeToken(){

}



function getHeadersData(){
    const headersInfo = new Headers();
    headersInfo.append('Content-Type', 'application/json');
    headersInfo.append('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJleHAiOjE1ODY3ODg0NzksImlhdCI6MTU4Njc3MDQ3OX0.tcWIrPvgybj11P2AKSfx8jZHDPpO7iWN2JOr0GERgHqojSfCByTQ_q3-8Q31OeP0bBb4osATGKH6gDg1IXmbbA');
    return headersInfo;
}
const showPlayerInformation = function(players){
   let  tableData = document.querySelector("#tableData");
   let data = `<table class='table table-striped'>
                    <tr>
                        <th>Name</th>
                        <th>Label</th>
                        <th>Role</th>
                        <th>Price</th>
                    <tr>
                `;
    players.forEach(p=>{
        data += `<tr>
                    <td>${p.name}</td><td>${p.label}</td><td>${p.role}</td><td>${p.price}</td>
                 </tr>
                `
    })
    data += `</table>`
    document.querySelector("#tableData").innerHTML = data;
}
const showTeamDetailInformation = (team)=>{
    console.log(team);
    let url = `https://indipl2020.herokuapp.com/ipl2020/team/${team}`;
    fetch(url,{
         method: 'GET',
         headers: getHeadersData(),
    })
    .then(response=>{
        return response.json();
    }).then(json=>{
       showPlayerInformation(json);
    }).catch(error=>{
        console.error(error);
    })
}

const showTeamInfo = ()=>{
       let team = document.querySelector("#idSelect").value;
       if(team !== ""){
            showTeamDetailInformation(team);
       }
}
const showLabels = ()=>{
    let data =`<select class='form-control' id="idSelect" onchange=showTeamInfo()>`
    data += `<option value=''>Select Team</option>`;
    labels.forEach(ele=>{
        data += `<option value='${ele}'>${ele}</option>`;
    })
    data +='</select>';
    document.querySelector("#idLabels").innerHTML = data;

}

const labelInfo = ()=>{
    fetch("https://indipl2020.herokuapp.com/ipl2020/team/labels",{
         method: 'GET',
         headers: getHeadersData(),
    })
    .then(response=>{
        return response.json();
    }).then(json=>{
        labels = json.labels;
        showLabels();
    }).catch(error=>{
        console.error(error);
    })
}
labelInfo();