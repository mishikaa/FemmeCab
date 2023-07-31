import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import Webcam from "react-webcam";

export const Camera = () => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const navigate = useNavigate();
    
    const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
    }
}
    return (
    <div className='flex h-[100vh] overflow-hidden justify-center items-center'>
        <img 
        className="cursor-pointer rounded-full bg-white p-1 w-8 hover:w-9 absolute top-4 left-4 z-10 shadow-md" 
        src="/assets/arrows/blackBack.png" 
        alt="back"
        onClick={()=>navigate("/rideInProgress")}
      />
        <h1 className='absolute text-2xl top-5 bold-xl uppercase font-extrabold'>
            Show hand gesture in case of an emergency 
        </h1>
        <Webcam
            ref={webcamRef}
            className='md:w-[40rem] md:h-[30rem] sm:w-[320px] sm:h-[240px] m-auto absolute left-0 right-0 text-center rounded-xl border-2 border-[rgba(0,98,90,0.4)] shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)]'
        />

        <canvas
          ref={canvasRef}
          className='md:w-[40rem] md:h-[30rem] sm:w-[320px] sm:h-[240px] m-auto z-9 absolute left-0 right-0 text-center'
        />
        {/* NEW STUFF
        {emoji !== null ? (
          <img
            src={images[emoji]}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 400,
              bottom: 500,
              right: 0,
              textAlign: "center",
              height: 100,
            }}
          />
        ) : (
          ""
        )} */}

    </div>
  )
}
