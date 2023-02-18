let formEl = document.querySelector("form")

let currentIdOfVaccinated = localStorage.getItem("currentIdOfVaccinated") || null;
let vaccine_register_data = JSON.parse(localStorage.getItem("vaccine_register_data")) || [];
let vaccinatedData = JSON.parse(localStorage.getItem("vaccinated")) || [];

let currentData = vaccine_register_data.filter((ele)=>{
    return ele.id==currentIdOfVaccinated
})
currentData = currentData[0]

formEl.addEventListener("submit", (event)=>{
    event.preventDefault();
    let first = formEl.first.value
    let second = formEl.second.value
    let third = formEl.third.value
    let fouth = formEl.fourth.value

    let correctOTP = String(currentData.otp);
    
    const verifyOTP = new Promise((resolve, reject) => {
        if (correctOTP[0]==first && correctOTP[1]==second && correctOTP[2]==third && correctOTP[3]==fouth) {
            resolve();
        } else {
            reject();
        }
    });



    verifyOTP.then(addToQueue)
    .then(() => new Promise(resolve => setTimeout(resolve, 5000)))
    .then(vaccinating)
    .then(() => new Promise(resolve => setTimeout(resolve, 5000)))
    .then(vaccinated)
    .catch(() => alert(`Invalid OTP`));   
})



function addToQueue() {
    alert(`${currentData.name} Added to Queue`);
}
function vaccinating() {
    alert(`Vaccinating ${currentData.vaccine}`);
}
function vaccinated() {
    alert(`${currentData.name} Vaccinated`);
    addToVaccinated()

}

function addToVaccinated(){
    vaccinatedData.push(currentData)
    localStorage.setItem("vaccinated", JSON.stringify(vaccinatedData))
    let afterDeleteData = vaccine_register_data.filter((ele)=>{
        return ele.id!=currentIdOfVaccinated
    })
    localStorage.removeItem("currentIdOfVaccinated")
    localStorage.setItem("vaccine_register_data", JSON.stringify(afterDeleteData))
    location.href = "vaccinated.html"
}