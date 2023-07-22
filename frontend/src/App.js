import './App.css';
import  {Route, Routes} from "react-router-dom";
import { Homepage } from './pages/Homepage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Mappage from './pages/Mappage';
import AddLocation from './pages/AddLocation';
import { Confirm } from './pages/Confirm';
import RideInProgress from './pages/RideInProgress';

function App() {

  return (
    <div className="App w-full h-full">
      <ToastContainer />  

      <Routes>
        <Route exact path='/' element={<Homepage />}/>
        <Route exact path='/map' element={<Mappage />}/>
        <Route exact path='/addLocation' element={<AddLocation />}/>
        <Route exact path='/confirm' element={<Confirm />}/>
        <Route exact path='/rideInProgress' element={<RideInProgress />}/>
      </Routes>
      
    </div>
    
  );
}

export default App;
