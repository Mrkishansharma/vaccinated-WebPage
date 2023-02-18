let formEl = document.querySelector("form")

let vaccine_register_data = JSON.parse(localStorage.getItem("vaccine_register_data")) || [] 

formEl.addEventListener("submit", (event)=> {
    event.preventDefault()
    let obj = {
        id: fourDigitRandomNumber(),
        name: formEl.name.value,
        age: formEl.age.value,
        designation: formEl.des.value,
        priority: formEl.priority.value,
        vaccine: formEl.vaccine.value,
        otp: fourDigitRandomNumber()
    }
    // console.log(obj);
    vaccine_register_data.push(obj)
    console.log(vaccine_register_data);
    localStorage.setItem("vaccine_register_data",JSON.stringify(vaccine_register_data))
    alert("Successfully registers.")
    location.reload()
})


function fourDigitRandomNumber() {
    var minm = 1000;
    var maxm = 9999;
    return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
}