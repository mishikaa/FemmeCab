import { useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css'
import './sheet.css'

const LocationSheet = () => {
  const [open, setOpen] = useState(false)
  
  return (
    <>
      <button 
        onClick={() => setOpen(!open)}
        className='w-full text-start font-bold text-xl mt-6'
      >
        Saved Locations
      </button>      
      <BottomSheet
        open={open}
        backgroundStyle={{ backgroundColor: '#1C1C1E' }}
        onDismiss={() => setOpen(false)}
        header={
          <div className="sheetHeader text-[20px] font-semibold">
            Saved Locations
          </div>}
        snapPoints={({ maxHeight }) => 0.5 * maxHeight}
      >
        <div className="sheetBody">SHEET BODY</div>
      </BottomSheet>
    </>
  )
}

export default LocationSheet
