import './App.css';
import  {Route, Routes} from "react-router-dom";
import { Homepage } from './pages/Homepage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function App() {
  return (
    <div className="App w-full h-full">
      <ToastContainer />  

      <Routes>
        <Route exact path='/' element={<Homepage />}/>
      </Routes>
      
    </div>
    
  );
}

export default App;
