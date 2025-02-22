async function startSpeedTest() {
  document.getElementById("speed-result").innerText = "Testing...";
  const response = await fetch("/speedtest");
  const data = await response.json();
  document.getElementById("speed-result").innerText = `Speed: ${data.speed} Mbps`;
}

async function checkPing() {
  let host = document.getElementById("ping-input").value;
  if (!host) {
    document.getElementById("ping-result").innerText = "Please enter a valid website or IP.";
    return;
  }
  document.getElementById("ping-result").innerText = "Pinging...";
  const response = await fetch(`/ping?host=${host}`);
  const data = await response.json();
  document.getElementById("ping-result").innerText = `Ping: ${data.ping} ms`;
}
