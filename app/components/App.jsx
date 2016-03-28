import React from 'react';
import ReactDOM from 'react-dom';
import {RouteHandler} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './Main';

injectTapEventPlugin();

ReactDOM.render(
  <Main />,
  document.getElementById('app')
);

// class App extends React.Component {
//   render() {
//     return (
//       <div>
//         6
//       </div>
//     );
//   }
// }
// 
// ReactDOM.render(
//   <App />,
//   document.getElementById('app')
// );