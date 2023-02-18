let vaccinatedData = JSON.parse(localStorage.getItem("vaccinated")) || [];



displayData(vaccinatedData)
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
                </tr>`
    }).join("")
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
        filteredArray = vaccinatedData.filter((ele) => {
            return ele.vaccine==vaccineFilterEl.value && ele.priority==priorityFilterEl.value
        })
        displayData(filteredArray)
    }else if(ageFilterEl.value){
        filteredArray = sortAscDesc()
        displayData(filteredArray)
    }else if(vaccineFilterEl.value){
        filteredArray = vaccinatedData.filter((ele) => {
            return ele.vaccine==vaccineFilterEl.value
        })
        displayData(filteredArray)
    }else if(priorityFilterEl.value){
        filteredArray = vaccinatedData.filter((ele) => {
            return ele.priority==priorityFilterEl.value
        })
        displayData(filteredArray)
    }else{
        displayData(vaccinatedData)
    }
}


function sortAscDesc(){
    if(ageFilterEl.value=="LTH"){
        return vaccinatedData.sort((a,b) => (a.age - b.age))
    }else{
        return vaccinatedData.sort((a,b) => (b.age - a.age))
    }
}