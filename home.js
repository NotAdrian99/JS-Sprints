// function createEventCards(data) {
//   let section = document.getElementById("card");

//   for (let event of data.events) {
//     section.innerHTML += createCardMarkup(event);
//   }
// }

// function createCardMarkup(event) {
//   return `<article class="card" id="card">
//     <img class="cardImg" src="${event.image}" alt="">
//     <div class="card-body">
//       <h5 class="card-title">${event.name}</h5>
//       <p class="card-text">${event.description}</p>
//       <p>Date: ${event.date}</p>
//       <p>Price: $${event.price}</p>
//       <button type="button" class="btn btn-outline-danger "><a class="cardBtn" href="details.html?_id=${event._id}">Details</a></button>
//     </div>
//   </article>`;
// }
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const checkedIds = [];
const searchInput = document.getElementById("searchInput");

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
    filterEventCards(data);
  });
});
searchInput.addEventListener("keyup", function () {
  filterEventCards(data);
});
function filterEventCards(data) {
  const section = document.getElementById("card");
  section.innerHTML = "";
  const searchValue = searchInput.value.toLowerCase();
  if (checkedIds.length === 0) {
    data.events.forEach(function (event) {
      if (event.name.toLowerCase().includes(searchValue)) {
        const cardMarkup = createCardMarkup(event, []);
        section.innerHTML += cardMarkup;
      }
    });
  } else {
    data.events.forEach(function (event) {
      if (event.name.toLowerCase().includes(searchValue)) {
        const cardMarkup = createCardMarkup(event, checkedIds);
        section.innerHTML += cardMarkup;
      }
    });
  }
}
function createCardMarkup(event, checkedIds) {
  if (checkedIds.length > 0 && !checkedIds.includes(event.category)) {
    return "";
  }
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
filterEventCards(data);
