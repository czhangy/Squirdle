// Express framework
const express = require("express");
// Cross-origin scripting
const cors = require("cors");
// Use of .env
require("dotenv").config();
// Handle history routing
const history = require('connect-history-api-fallback');

// Init app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(history());

// Force SSL
// app.use((req, res, next) => {
//   if (process.env.NODE_ENV === 'production') {
//       if (req.headers['x-forwarded-proto'] !== 'https')
//           return res.redirect('https://' + req.headers.host + req.url);
//       else
//           return next();
//   } else
//       return next();
// });

// Apply route
// const pokemonRouter = require("./routes/pokemon.route.js");
// app.use("/api/pokemon", pokemonRouter);

// Handle production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(__dirname + "/public/"));
  // Handle SPA routing
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
