let tbodyEl = document.querySelector("tbody");


let vaccine_register_data = JSON.parse(localStorage.getItem("vaccine_register_data")) || [] ;

displayData(vaccine_register_data)
function displayData(data){
let tbodyEl = document.querySelector("tbody");
    tbodyEl.innerHTML = data.map((ele) => {
        return `<tr>
                    <td>${ele.id}</td>
                    <td>${ele.name}</td>
                    <td>${ele.age}</td>
                    <td>${ele.designation}</td>
                    <td>${ele.priority}</td>
                    <td>${ele.vaccine}</td>
                    <td>${ele.otp}</td>
                    <td class="delete--td" data-id="${ele.id}">Delete</td>
                    <td class="vaccinate--td" data-id="${ele.id}">Vaccinate</td>
                </tr>`
    }).join("")
}

let deleteButtons = document.querySelectorAll(".delete--td")
for(let btn of deleteButtons){
    btn.addEventListener("click", (event)=>{
        let id = event.target.dataset.id
        let dataAfterDelete = vaccine_register_data.filter((ele)=>{
            return ele.id != id
        })
        vaccine_register_data = dataAfterDelete
        localStorage.setItem("vaccine_register_data",JSON.stringify(vaccine_register_data));
        // vaccine_register_data = JSON.parse(localStorage.getItem("vaccine_register_data")) || [];
        location.reload()
    })
}

let vaccinateButtons = document.querySelectorAll(".vaccinate--td")
for(let btn of vaccinateButtons){
    btn.addEventListener("click", (event)=>{
        let id = event.target.dataset.id
        localStorage.setItem("currentIdOfVaccinated", id)
        location.href = 'otp.html'
    })
}




let filteredArray = []

let vaccineFilterEl = document.getElementById("vaccine");
let priorityFilterEl = document.getElementById("priority");
let ageFilterEl = document.getElementById("age")

vaccineFilterEl.addEventListener("change", sortAndFilterFunc)
priorityFilterEl.addEventListener("change", sortAndFilterFunc)
ageFilterEl.addEventListener("change", sortAndFilterFunc)


function sortAndFilterFunc(){
    if(vaccineFilterEl.value && priorityFilterEl.value && ageFilterEl.value){
        filteredArray = sortAscDesc()
        filteredArray = filteredArray.filter((ele) => {
            return ele.vaccine==vaccineFilterEl.value && ele.priority==priorityFilterEl.value
        })
        displayData(filteredArray)
    }else if(priorityFilterEl.value && ageFilterEl.value){
        filteredArray = sortAscDesc()
        filteredArray = filteredArray.filter((ele) => {
            return ele.priority==priorityFilterEl.value
        })
        displayData(filteredArray)
    }else if(vaccineFilterEl.value && ageFilterEl.value){
        filteredArray = sortAscDesc()
        filteredArray = filteredArray.filter((ele) => {
            return ele.vaccine==vaccineFilterEl.value
        })
        displayData(filteredArray)
    }else if(vaccineFilterEl.value && priorityFilterEl.value){
        filteredArray = vaccine_register_data.filter((ele) => {
            return ele.vaccine==vaccineFilterEl.value && ele.priority==priorityFilterEl.value
        })
        displayData(filteredArray)
    }else if(ageFilterEl.value){
        filteredArray = sortAscDesc()
        displayData(filteredArray)
    }else if(vaccineFilterEl.value){
        filteredArray = vaccine_register_data.filter((ele) => {
            return ele.vaccine==vaccineFilterEl.value
        })
        displayData(filteredArray)
    }else if(priorityFilterEl.value){
        filteredArray = vaccine_register_data.filter((ele) => {
            return ele.priority==priorityFilterEl.value
        })
        displayData(filteredArray)
    }else{
        displayData(vaccine_register_data)
    }
}


function sortAscDesc(){
    if(ageFilterEl.value=="LTH"){
        return vaccine_register_data.sort((a,b) => (a.age - b.age))
    }else{
        return vaccine_register_data.sort((a,b) => (b.age - a.age))
    }
}