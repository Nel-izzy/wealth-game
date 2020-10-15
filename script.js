const main = document.getElementById("main")
const addUserBtn = document.getElementById("add-user")
const doubleMoneyBtn = document.getElementById("double-money")
const showMillBtn = document.getElementById("show-millionaires")
const sortBtn = document.getElementById("sort")
const calcWealthBtn = document.getElementById("calculate-wealth")

let data = []
getRandomUser()

function getRandomUser(){
    fetch("https://randomuser.me/api/")
          .then(res => res.json())
          .then(data => {
              //console.log(data);
              const user = data.results[0]
              const newUser = {
                  name: `${user.name.first} ${user.name.last}`,
                  money: Math.floor(Math.random() * 1000000)
              }
              addData(newUser)
        })
        console.log(data);

         
}

function updateDom(providedData =  data){
    main.innerHTML = "<h2><strong>Person </strong>Wealth</h2>"
    providedData.forEach(person => {
        const element = document.createElement("div")
        element.classList.add("person");
        element.innerHTML = `<strong>${person.name}</strong> ${formatMoney(person.money)}`
        main.appendChild(element)
    })
}

const formatMoney = number => "N"+ number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')

function addData(user){
    data.push(user)
    updateDom()
}

function doubleMoney(){
  data =  data.map(user=> {
       return {
           ...user,
           money: user.money * 2
       }
   })
   updateDom()
}
function showMillionaires(){
    data =  data.filter(user => user.money >= 1000000)
     updateDom()
  }
function sortRichest(){
    data.sort((a, b) => b.money-a.money)
    updateDom()
}
function calculateWealth(){
    
   // const arr = data.map(user=> user.money)
    const total = data.reduce((acc, user) => acc += user.money)
    const element = document.createElement("div")
    element.innerHTML = `<h3>Total Wealth <strong>${formatMoney(total)}</strong></h3>`
    main.appendChild(element)
}
  

addUserBtn.addEventListener("click", getRandomUser)
doubleMoneyBtn.addEventListener("click", doubleMoney)
showMillBtn.addEventListener("click", showMillionaires)
sortBtn.addEventListener("click", sortRichest)
calcWealthBtn.addEventListener("click", calculateWealth)

