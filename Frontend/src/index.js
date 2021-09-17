import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// const express = require("express");
// const app = express();
// const axios = require("axios").create({baseUrl:"https://jsonplaceholder.typicode.com/"});

// app.listen(8000, ()=> {
//     console.log("Server started at port 8000");
// });


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

