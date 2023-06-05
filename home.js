let section = document.getElementById("card");

console.log(section);

for (let event of data.events) {
  section.innerHTML += `<article class="card" id="card">
        <img class="cardImg" src="${event.image}" alt="">
        <div class="card-body">
        <h5 class="card-title">${event.name}</h5>
        <p class="card-text">${event.description}</p>
        <p>Date: ${event.date}</p>
        <p>Price: $${event.price}</p>
        <button type="button" class="btn btn-outline-danger "><a class="cardBtn" href="details.html
            ">Details</a></button>
        </div>
</article>`;
}
