// Function to update clock every second
function updateClock() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let amPm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  hours = hours % 12 || 12;
  minutes = minutes.toString().padStart(2, "0");
  seconds = seconds.toString().padStart(2, "0");

  document.getElementById("clock").innerText = `${hours}:${minutes}:${seconds} ${amPm}`;
}

// Update clock every second
setInterval(updateClock, 1000);
updateClock(); // Call once immediately

// Sidebar toggle function
function toggleSidebar() {
  let sidebar = document.getElementById("sidebar");
  let content = document.getElementById("content");

  if (sidebar.style.left === "0px") {
    sidebar.style.left = "-250px";
    content.style.marginLeft = "0";
  } else {
    sidebar.style.left = "0px";
    content.style.marginLeft = "250px";
  }
}
