 function createEventCardFromUrl() {
  let section = document.getElementById("card");
  let urlParams = new URLSearchParams(window.location.search);
  let eventId = parseInt(urlParams.get("_id"));

   fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((response) => response.json())
  .then((data)=>{
    if (eventId) {
      let event = data.events.find((event) => {
       return  event._id === eventId
      });
      if (event) {
        section.innerHTML = createCardMarkup(event);
      }
    }
  })
}

function createCardMarkup(event) {
  return `<article class="card" id="card">
  <img class="cardImg" src="${event.image}" alt="">
  <div class="card-body">
    <h5 class="card-title">${event.name}</h5>
    <p class="card-text">${event.description}</p>
    <p>Date: ${event.date}</p>
    <p>Category: ${event.category}</p>
    <p>Place: ${event.place}</p>
    <p>Capacity: ${event.capacity}</p>
    <p>Price: $${event.price}</p>
    </div>
  </article>`;
}

createEventCardFromUrl(data);
