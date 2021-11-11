
const { urlencoded } = require('express');
const express = require('express');
const path = require('path');
const cors = require('cors');
const serveRoutes = require('./routes');
const inventory = require('./utils/clases/Inventory');
const { config } = require('./config');
// Initialization
const app = express();




// Settings
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views', 'ejs'));
app.set('view engine', 'ejs');

// Middlewares
app.use(cors(`${config.PORT}`));

// Global variables
const PORT = config.PORT;

// Rutas
serveRoutes(app);

app.listen(PORT, () => {
  console.log(`server on http://localhost:${PORT}`);
});
