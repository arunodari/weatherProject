const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(express.urlencoded({ encoded: true }));
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.post("/", (req, res) => {
  const query = req.body.cityName;
  // const apiKey = a1ec61aa771da4eccbb83b27dcce9648;
  // const unit = metric;

  // const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=a1ec61aa771da4eccbb83b27dcce9648&units=metric`;
  https.get(url, (response) => {
    console.log(response.statusCode);
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>the weather is currently  " + weatherDescription + "</p>");
      res.write(
        "<h1>the temperature in " +
          query +
          " is " +
          temp +
          " degree celcius" +
          "</h1>"
      );
      res.write("<img src=" + imageURL + ">");
      res.send();
    });
  });
});

// This code block sets up a route for the server to respond to GET requests on the root URL ("/").
// When a user navigates to the root URL in their web browser, the callback function is executed.

// The callback function first constructs a URL for the OpenWeatherMap API by including the city name (Biratnagar),
//  an API key (a1ec61aa771da4eccbb83b27dcce9648), and a query parameter to return the temperature in Celsius (units=metric).

// Then, it calls the https.get() method with the constructed URL to make a GET request to the OpenWeatherMap API.
// When the response is received, the code logs the response status code to the console.

// The response object is a stream, and the response.on("data", ...) method is used to listen for data events.
// When data is received, the callback function is executed, which parses the JSON response data into a JavaScript object using JSON.parse(). Then, it extracts the temperature, weather description, and icon URL from the parsed object.

// Finally, the code uses the res.write() method to send an HTML response to the client's web browser.
// It includes the weather description, temperature, and an image of the weather icon. The res.send() method is called to complete the response.
app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
// app.get is a method in the Express.js web application framework for Node.js that is used to define routes that match GET requests
//  to a specific URL.

// When you call app.get, you are creating a new route for your Express application that will handle GET requests to a specific URL path.
//  The basic syntax of app.get method is:

// csharp
// Copy code
// app.get(path, callback)
// Where:

// path is the URL path you want to handle. It can be a string representing a specific URL path,
// or it can be a pattern that uses regular expressions to match a variety of URL paths.
// callback is the function that will be executed when the route is matched.
// It takes two arguments, a request object that contains information about the incoming request,
// and a response object that is used to send the response back to the client.
// Here's an example of how you might use app.get to create a simple "Hello World" web page:

// javascript
// Copy code
// const express = require('express');
// const app = express();

// app.get('/', function(req, res) {
//   res.send('Hello World!');
// });

// In this example, we're creating a new route that matches GET requests to the root URL (/).
// When a GET request is received, the callback function sends the string "Hello World!" back to the client in the response body.
