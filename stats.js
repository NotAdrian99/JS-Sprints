/// Event statistics

fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((response) => response.json())
  .then((data) => {
    const highestAssistanceEvent = data.events.reduce((prev, current) => {
      return current.assistance / current.capacity > prev.assistance / prev.capacity ? current : prev;
    });

    const lowestAssistanceEvent = data.events.reduce((prev, current) => {
      return current.assistance / current.capacity < prev.assistance / prev.capacity ? current : prev;
    });

    const largerCapacityEvent = data.events.reduce((prev, current) => {
      return current.capacity > prev.capacity ? current : prev;
    });

    document.getElementById("highestAssistanceEvent").textContent = highestAssistanceEvent.name;
    document.getElementById("lowestAssistanceEvent").textContent = lowestAssistanceEvent.name;
    document.getElementById("largerCapacityEvent").textContent = largerCapacityEvent.name;

    const highestAssistancePercentage = (highestAssistanceEvent.assistance / highestAssistanceEvent.capacity) * 100;
    const lowestAssistancePercentage = (lowestAssistanceEvent.assistance / lowestAssistanceEvent.capacity) * 100;
    const largerCapacity = largerCapacityEvent.capacity;

    document.getElementById("highestAssistanceEventPercentage").textContent = highestAssistancePercentage.toFixed(2) + "%";
    document.getElementById("lowestAssistanceEventPercentage").textContent = lowestAssistancePercentage.toFixed(2) + "%";
    document.getElementById("largerCapacityEventCapacity").textContent = `Capacity :${largerCapacity}`;
  });

/// Upcoming event statistics

document.addEventListener("DOMContentLoaded", function () {
  fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then((response) => response.json())
    .then((data) => {
      const upcomingTableBody = document.getElementById("upcoming-table-body");
      const currentDate = new Date(data.currentDate);

      const eventsByCategory = {};
      data.events.forEach((event) => {
        if (!eventsByCategory[event.category]) {
          eventsByCategory[event.category] = [];
        }
        eventsByCategory[event.category].push(event);
      });

      Object.keys(eventsByCategory).forEach((category) => {
        const events = eventsByCategory[category].filter((event) => new Date(event.date) > currentDate);
        const revenues = events.reduce((total, event) => total + event.price * event.estimate, 0);
        const attendance = events.reduce((total, event) => total + (event.estimate / event.capacity) * 100, 0) / events.length;

        const row = document.createElement("tr");
        const categoryCell = document.createElement("td");
        const revenuesCell = document.createElement("td");
        const attendanceCell = document.createElement("td");

        categoryCell.textContent = category;
        revenuesCell.textContent = revenues.toFixed(2);
        attendanceCell.textContent = attendance.toFixed(2) + "%";

        row.appendChild(categoryCell);
        row.appendChild(revenuesCell);
        row.appendChild(attendanceCell);

        upcomingTableBody.appendChild(row);
      });
    })
    .catch((error) => {
      console.log("Error:", error);
    });
});

/// Past event statistics

fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((response) => response.json())
  .then((data) => {
    const upcomingTableBody = document.getElementById("upcoming-table-body");
    const pastTableBody = document.getElementById("past-table-body");
    const currentDate = new Date(data.currentDate);

    const events = data.events.filter((event) => new Date(event.date) < currentDate);
    const categories = {};
    let totalRevenue = 0;
    let totalPercentage = 0;

    events.forEach((event) => {
      const revenue = event.price * event.assistance;
      totalRevenue += revenue;

      const percentage = (event.assistance / event.capacity) * 100;
      totalPercentage += percentage;

      if (!categories[event.category]) {
        categories[event.category] = {
          revenue: revenue,
          percentage: percentage,
          count: 1,
        };
      } else {
        categories[event.category].revenue += revenue;
        categories[event.category].percentage += percentage;
        categories[event.category].count++;
      }
    });

    const averagePercentage = totalPercentage / events.length;

    for (const category in categories) {
      const row = document.createElement("tr");
      const categoryNameCell = document.createElement("td");
      const revenueCell = document.createElement("td");
      const percentageCell = document.createElement("td");

      categoryNameCell.textContent = category;
      revenueCell.textContent = categories[category].revenue;
      percentageCell.textContent = (categories[category].percentage / categories[category].count).toFixed(2) + "%";

      row.appendChild(categoryNameCell);
      row.appendChild(revenueCell);
      row.appendChild(percentageCell);
      pastTableBody.appendChild(row);
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });
