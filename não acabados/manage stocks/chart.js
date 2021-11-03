const broker = document.querySelector("#broker").value;
const region = document.querySelector("#region").value;
const stock = document.querySelector("#stock").value;
const amount = document.querySelector("#amount").value;
const buyPrice = document.querySelector("#buyPrice").value;
const buyDate = document.querySelector("#buyDate").value;
const submitForm = document.querySelector("#SubimitForm");

let currentDate =
  today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();

console.log(currentDate);
//chart
// // const labels = ["January", "February", "March", "April", "May", "June"];
const findLastPrice = function () {};

submitForm.addEventListener("click", function () {
  const labels = [];
  let today = new Date();

  let currentDate =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();

  console.log(currentDate);
  labels = [buyDate, currentDate];

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: `stock ${stock} at ${broker}`,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [buyPrice],
      },
    ],
  };

  const config = {
    type: "line",
    data: chartData,
    options: {},
  };
  const myChart = new Chart(document.getElementById("myChart"), config);

  const XYZ = $(document).ready(function () {
    var callback = function (data) {
      var price = data.query.results.span[0].content;
      alert("Stock Price: " + price);
    };

    var url = "http://query.yahooapis.com/v1/public/yql";
    // this is the lovely YQL query (html encoded) which lets us get the stock price:
    // select * from html where url="http://finance.yahoo.com/q?s=goog" and xpath='//span[@id="yfs_l10_goog"]'
    var data =
      "q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Ffinance.yahoo.com%2Fq%3Fs%3D" +
      stock +
      "%22%20and%20xpath%3D'%2F%2Fspan%5B%40id%3D%22yfs_l10_" +
      stock +
      "%22%5D'&format=json";
    $.getJSON(url, data, callback);
  });

  console.log(XYZ);
});

//
