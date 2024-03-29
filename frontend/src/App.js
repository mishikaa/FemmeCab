import './App.css';
import  {Route, Routes} from "react-router-dom";
import { Homepage } from './pages/Homepage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Dashboard from './pages/Dashboard';
import AddLocation from './pages/AddLocation';
import { Confirm } from './pages/Confirm';
import RideInProgress from './pages/RideInProgress';
import { Contact } from './pages/Contact';
import { Camera } from './components/Camera';
import { About } from './pages/About';
import ProfilePage from './pages/ProfilePage';

function App() {

  return (
    <div className="App w-full h-full">
      <ToastContainer />  

      <Routes>
        <Route exact path='/' element={<Homepage />}/>
        <Route exact path='/about' element={<About />}/>
        <Route exact path='/contact' element={<Contact />}/>
        <Route exact path='/dashboard' element={<Dashboard />}/>
        <Route exact path='/profile' element={<ProfilePage />}/>
        <Route exact path='/addLocation' element={<AddLocation />}/>
        <Route exact path='/confirm' element={<Confirm />}/>
        <Route exact path='/rideInProgress' element={<RideInProgress />}/>
        <Route exact path='/camera' element={<Camera />}/>
      </Routes>
      
    </div>
    
  );
}

export default App;
