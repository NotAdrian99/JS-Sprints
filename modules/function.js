const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const searchInput = document.getElementById("searchInput");
const checkedIds = [];

let isFetching = false;
let eventValue = "";
checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    if (this.checked) {
      const checkboxId = this.id;
      checkedIds.push(checkboxId);
    } else {
      const checkboxId = this.id;
      const index = checkedIds.indexOf(checkboxId);
      if (index > -1) {
        checkedIds.splice(index, 1);
      }
    }
    filterEventCards(eventValue);
  });
});

searchInput.addEventListener("keyup", function () {
  filterEventCards(eventValue);
});

 function filterEventCards(value) {
  if (isFetching) return;
  const section = document.getElementById("card");
  section.innerHTML = "";
  const searchValue = searchInput.value.toLowerCase();

  isFetching = true;

  fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then((response) => response.json())
    .then((data) => {
      const filteredEvents =   data.events.filter(function (event) {
        if(value === "home"){
          eventValue = "home"
         return  event.name.toLowerCase().includes(searchValue) && (checkedIds.length === 0 || checkedIds.includes(event.category));
        } else if(value === "past"){
          eventValue = "past"
          return event.name.toLowerCase().includes(searchValue) && (checkedIds.length === 0 || checkedIds.includes(event.category)) && event.date < data.currentDate
      } else if(value === "upcoming"){
        eventValue = "upcoming"
        return event.name.toLowerCase().includes(searchValue) && (checkedIds.length === 0 || checkedIds.includes(event.category)) && event.date > data.currentDate
      }
    });
      return filteredEvents
    }).then((filteredEvents)=>{
      if (filteredEvents.length === 0) {
        section.innerHTML = `<div class="alert alert-dark" role="alert" id=alert>
      Sorry! no matching events were found ☹
    </div>
    `;
      } else {
        filteredEvents.forEach(function (event) {
          const cardMarkup = createCardMarkup(event);
          section.innerHTML += cardMarkup;
        });
      }
      isFetching = false;
    }).catch((error) => console.log(error));
}

function createCardMarkup(event) {
  return `<article class="card" id="card">
    <img class="cardImg" src="${event.image}" alt="">
    <div class="card-body">
      <h5 class="card-title">${event.name}</h5>
      <p class="card-text">${event.description}</p>
      <p>Date: ${event.date}</p>
      <p>Price: $${event.price}</p>
      <button type="button" class="btn btn-outline-danger "><a class="cardBtn" href="details.html?_id=${event._id}">Details</a></button>
    </div>
  </article>`;
}

 export default {  filterEventCards }