import './App.css';
import  {Route, Routes} from "react-router-dom";
import { Homepage } from './pages/Homepage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Homepage />}/>
      </Routes>
      
    </div>
    
  );
}

export default App;
