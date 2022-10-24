// src/App.js
import Training from './components/trainingen/Training'; 
import TRAININGEN_DATA from './api/mock-data';

function App() {
 return (
  <div className="App">
    {TRAININGEN_DATA.map((training, id) => 
      <Training key={id} {...training}/>)}
  </div>
 );
}

export default App;