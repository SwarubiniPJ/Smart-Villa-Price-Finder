const properties=[]
const cities=["Chennai","Mumbai","Delhi","Bangalore","Hyderabad","Pune"]

let selectedProperty=null


for(let i=1;i<=50;i++){

properties.push({
id:i,
title:"Luxury Villa "+i,
city:cities[Math.floor(Math.random()*cities.length)],
rooms:Math.floor(Math.random()*5)+1,
price:50+Math.floor(Math.random()*150),
status:"AVAILABLE",
offer:Math.floor(Math.random()*30),
image:"images/house"+i+".jpg"
})

}


function displayProperties(list){

let grid=document.getElementById("propertyGrid")
grid.innerHTML=""

list.forEach(p=>{

grid.innerHTML+=`

<div class="card">

<img src="${p.image}">

<h3>${p.title}</h3>

<p>${p.city}</p>

<p>${p.rooms} Rooms</p>

<p>₹${p.price} Lakhs</p>

<p>${p.status}</p>

<button onclick="openProperty(${p.id})">View</button>

</div>

`

})

}

displayProperties(properties)


function openProperty(id){

selectedProperty=properties.find(p=>p.id===id)

document.getElementById("modalTitle").innerText=selectedProperty.title
document.getElementById("modalCity").innerText=selectedProperty.city
document.getElementById("modalRooms").innerText=selectedProperty.rooms
document.getElementById("modalPrice").innerText=selectedProperty.price
document.getElementById("modalImage").src=selectedProperty.image

document.getElementById("modal").style.display="flex"

}


function closeModal(){

document.getElementById("modal").style.display="none"

}


function buyProperty(){

if(selectedProperty){

alert(selectedProperty.title+" purchased successfully!")

selectedProperty.status="SOLD"

displayProperties(properties)

closeModal()

}

}


function searchProperties(){

let city=document.getElementById("city").value
let rooms=document.getElementById("rooms").value
let price=document.getElementById("price").value

let filtered=properties.filter(p=>

(city=="" || p.city==city) &&
(rooms=="" || p.rooms>=rooms) &&
(price=="" || p.price>=price)

)

displayProperties(filtered)

}


function showAll(){
displayProperties(properties)
}


function showOffers(){

let offerDiv=document.getElementById("offers")

offerDiv.innerHTML=""

let selected=properties.slice(0,5)

selected.forEach(p=>{

let time=120
let id="timer"+p.id

offerDiv.innerHTML+=`

<div class="card offer">

<img src="${p.image}">

<h3>${p.title}</h3>

<p>${p.offer}% OFF</p>

<p class="timer">Offer ends in <span id="${id}">${time}</span>s</p>

</div>

`

let interval=setInterval(()=>{

time--

let el=document.getElementById(id)

if(el) el.innerText=time

if(time<=0) clearInterval(interval)

},1000)

})

}

showOffers()


setInterval(()=>{

properties.forEach(p=>{

if(Math.random()>0.7){
p.status=p.status=="AVAILABLE"?"SOLD":"AVAILABLE"
}

})

displayProperties(properties)
showOffers()

},120000)