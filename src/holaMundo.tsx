import React from "react";
import ReactDOM from 'react-dom';
import { printVariables} from './playground'


ReactDOM.render(
  <div>
    <h1>Hola mundo, esto es React</h1>
  </div>,
  document.getElementById("root"),
  printVariables
);