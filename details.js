function createEventCardFromUrl(data) {
  let section = document.getElementById("card");
  let urlParams = new URLSearchParams(window.location.search);
  let eventId = urlParams.get("_id");

  if (eventId) {
    let event = data.events.find((event) => event._id === eventId);
    if (event) {
      section.innerHTML = createCardMarkup(event);
    }
  }
}

function createCardMarkup(event) {
  return `<article class="card" id="card">
  <img class="cardImg" src="${event.image}" alt="">
  <div class="card-body">
    <h5 class="card-title">${event.name}</h5>
    <p class="card-text">${event.description}</p>
    <p>Date: ${event.date}</p>
    <p>Date: ${event.category}</p>
    <p>Date: ${event.place}</p>
    <p>Date: ${event.capacity}</p>
    <p>Price: $${event.price}</p>
    </div>
  </article>`;
}

createEventCardFromUrl(data);
