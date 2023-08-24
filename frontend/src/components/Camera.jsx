import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@chakra-ui/react';
import './Camera.css';
import { successPopup } from './popup';


export const Camera = () => {
    
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const navigate = useNavigate();
    
    const [gestureResult, setGestureResult] = useState('');
    const [webcamActive, setWebcamActive] = useState(false);

    useEffect(() => {
    const interval = setInterval(() => {
      captureAndProcessFrame();
    }, 100); // Adjust the interval as needed

    return () => clearInterval(interval);
  }, [webcamActive]);
   
  const captureAndProcessFrame = async () => {
    const canvas = document.createElement('canvas');
    canvas.width = webcamRef.current.videoWidth;
    canvas.height = webcamRef.current.videoHeight;
    canvas.getContext('2d').drawImage(webcamRef.current, 0, 0);
    const frame = canvas.toDataURL('image/jpeg');

    try {
      const base64String = frame.replace(/^data:image\/jpeg;base64,/, '');
      const response = await axios.post('http://localhost:5000/api/webcam/process_stream', { frame: base64String });

      const canvasCtx = canvasRef.current.getContext('2d');
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw landmarks on canvas
      const landmarks = response.data.landmarks;
      if (landmarks) {
        landmarks.forEach(landmark => {
          const [x, y] = landmark;
          canvasCtx.beginPath();
          canvasCtx.arc(x, y, 5, 0, 2 * Math.PI);
          canvasCtx.fillStyle = 'green';
          canvasCtx.fill();
          canvasCtx.closePath();
        });
      }

      setGestureResult(response.data.gesture_result);
    } catch (error) {
      console.error(error);
    }
  };
  
  const startWebcam = async () => {
      setWebcamActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      webcamRef.current.srcObject = stream;
  };

  const stopWebcam = () => {
    const tracks = webcamRef.current.srcObject.getTracks();
    tracks.forEach(track => track.stop());
    setWebcamActive(false);
  };

  const SendSOS = () => {
      const {res} = axios.post('http://localhost:5000/api/messages', {
          message: `I need help! My current location is: ${123}.`,
          to: +918004912825
        })
      
      const data = res.json();
      // console.log(data);
      successPopup("SOS sent successfully!")
      stopWebcam();
      navigate('/rideInProgress');
  }
  return (
    
    <div className='h-[100vh] flex flex-col gap-5 items-center'>
      <div className='flex flex-row justify-between items-center'>
        <img 
        className="cursor-pointer rounded-full bg-white p-1 w-8 hover:w-9 absolute top-4 left-4 z-10 shadow-md" 
        src="/assets/arrows/blackBack.png" 
        alt="back"
        onClick={()=>navigate("/rideInProgress")}
      />
        <h1 className='text-2xl p-4 bold-xl uppercase font-extrabold'>
            Show hand gesture in case of an emergency 
        </h1>
      </div>
      
      <Button onClick={startWebcam}>Start Webcam</Button>
      <Button onClick={stopWebcam}>Stop Webcam</Button>
      
      {gestureResult && <p className=''>Gesture Result: {gestureResult}</p>}
      
      <div className="video-container">
        <video ref={webcamRef} autoPlay className="video" />
        <canvas ref={canvasRef} width={webcamRef.current?.videoWidth} height={webcamRef.current?.videoHeight} className="landmark-canvas" />
      </div>

      {gestureResult && SendSOS} 
    </div>
  )
}
