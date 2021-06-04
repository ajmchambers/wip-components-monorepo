import './App.css';
import { MyElementComponent } from '@ajmchambers/components-react';

function App() {
  return (
    <div className="App">
      <MyElementComponent>
        <h2>Slotted content</h2>
      </MyElementComponent>
    </div>
  );
}

export default App;
