// API Base URL
const API_BASE = window.location.origin;

// Fetch API Status
async function fetchStatus() {
  try {
    const response = await fetch(`${API_BASE}/api/status`);
    const data = await response.json();
    displayResult(data);
  } catch (error) {
    displayResult({ error: error.message });
  }
}

// Fetch Data
async function fetchData() {
  try {
    const response = await fetch(`${API_BASE}/api/data`);
    const data = await response.json();
    displayResult(data);
  } catch (error) {
    displayResult({ error: error.message });
  }
}

// Display Result
function displayResult(data) {
  const resultDiv = document.getElementById('result');
  resultDiv.textContent = JSON.stringify(data, null, 2);
}

// Event Listeners
document.getElementById('fetchStatus').addEventListener('click', fetchStatus);
document.getElementById('fetchData').addEventListener('click', fetchData);

// Load on page load
document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ App loaded');
  fetchStatus(); // Auto-check status
});


