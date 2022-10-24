// src/App.js
import Training from './components/trainingen/Training'; 
import TRAININGEN_DATA from './api/mock-data';

function App() {
 return (
  <div className="App">
    {TRAININGEN_DATA.map((training) => 
      <Training key={TRAININGEN_DATA.indexOf(training)} {...training}/>)}
  </div>
 );
}

export default App;