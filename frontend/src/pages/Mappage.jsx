import { ActionItems } from '../components/ActionItems';
import DashboardMap from '../components/DashboardMap';
import Profile from '../components/Profile';

const Mappage = () => {
  
    return (  
    <div className='flex flex-col w-full h-[120vh] overflow-y-auto text-black bg-gradient-to-b from-[#8e9eab] to-[#eef2f3]'>
      <div className='flex-col relative text-white rounded-br-[120px] bg-[var(--background-color)]'>
        <div className='flex justify-between items-center mb-8'>
          <h3 className="text-left text-xl p-3 ml-1 font-bold">FemmeCab</h3>
          <Profile />
        </div>
        
        <div className='text-left p-3 ml-3 mb-20'>
          <h4 className='text-[2rem] mb-1'>Recharge on the Go.</h4>
          <p className='ml-2'><i>Immerse in Reading. Doze Off. Seek the View.</i></p>
        </div>
        
        <img className='absolute w-20 right-1 bottom-4 -rotate-45' src="/assets/car.png" alt="car"></img>
      </div>
      <ActionItems />
      <div className='rounded-md h-[100%] text-left bg-[#E0E2F0] flex flex-col font-bold p-2 m-3 cursor-pointer shadow-[1.95px_1.95px_2.6px_rgba(0,0,0,0.2)]'>
        <h3 className="text-left text-lg mb-1 font-bold">Around You</h3>
        <DashboardMap />
      </div>
    </div>
  )
}

export default Mappage;