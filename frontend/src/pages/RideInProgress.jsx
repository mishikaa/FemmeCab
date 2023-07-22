import Map from '../components/Map'
import MapOverlays from '../components/MapOverlays'
import MoveMarker from '../components/MoveMarker'
import ProgressContainer from '../components/ProgressContainer'

const RideInProgress = () => {
    return (
    <div className="h-[100vh] flex flex-col text-black">
        <MapOverlays prevPage="confirm"/>
        <Map />
        <ProgressContainer />
        {/* <MoveMarker /> */}
    </div>
  )
}

export default RideInProgress
