const express = require('express');
//add middleware
//consider nodemon

const app = express();
const port = 3000; //add to .env later



app.listen(port, () => [
  console.log(`WW server listening on port ${port}`)
])