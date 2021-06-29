import logo from '../img/logo.svg';
import '../css/App.css';
import Board from './Routes'
import React from 'react';

// class Handler extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       displayRoutes: true,
//       displayFile: false,
//     }
//   }


//   render() {
//     return(
//       <Board/>
//     )
//   }
// }

function App() {
  return (
    <div className="App">
      <Board/>
    </div>
  );
}

export default App;
