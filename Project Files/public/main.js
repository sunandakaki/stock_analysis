// Function to fetch data from server
async function fetchData(hdb) {
    try {
      const response = await fetch(`/api/predict/${hdb}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }
  
  // Function to initialize the chart
async function initChart(hdb) {
    const data = await fetchData(hdb);
    
    // Assuming your data is in the format that can be directly fed into Chart.js
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'line', // or 'bar', 'pie', etc., depending on the type of chart you want
      data: {
        labels: data.map(item => item.date), // replace 'date' with the actual property name of the date in your dataset
        datasets: [{
          label: `Stock Prices for ${hdb}`,
          data: data.map(item => item.close), // replace 'close' with the property for stock price
          // Add other dataset properties like backgroundColor, borderColor, etc.
        }]
      },
      options: {
        // Chart.js options go here
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    initChart('hdb'); // Call this with the relevant collection name
  });
  