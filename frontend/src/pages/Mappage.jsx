import { ActionItems } from '../components/ActionItems';
import Map from '../components/Map';

const Mappage = () => {
  
    return (
    <div className='flex flex-col w-full h-[100vh] text-black'>
        <Map />
        <ActionItems />
    </div>
  )
}

export default Mappage;