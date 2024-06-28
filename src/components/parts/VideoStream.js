import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const socket = io(`${window.location.origin}`); // Connect to the backend server

const VideoStream = ({ isStreaming, setIsStreaming }) => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [streamKey, setStreamKey] = useState(''); // State for storing stream key

  useEffect(() => {
    const getMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        setMediaStream(stream);
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error('Error accessing media devices.', error);
      }
    };

    getMedia();
  }, []);

  const startRecording = () => {
    if (mediaStream && streamKey) { // Ensure streamKey is provided
      socket.emit('startstream', streamKey); // Send streamKey to backend

      const mediaRecorder = new MediaRecorder(mediaStream, {
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 2500000,
        mimeType: 'video/webm; codecs=vp8'
      });

      mediaRecorder.ondataavailable = (event) => {
        socket.emit('binarystream', event.data);
      };

      mediaRecorder.start(1000);
      mediaRecorderRef.current = mediaRecorder;
      setIsStreaming(true);
    } else {
      alert('Please enter a valid YouTube streaming key.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      socket.emit('stopstream'); // Notify backend to stop the stream
      setIsStreaming(false);
    }
  };

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        muted
        style={{
          width: '100%',  // Make the video width 100% of its container
          maxWidth: '600px',  // Limit maximum width to 600px
          border: '5px solid black',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
        }}
        className='mb-3'
      ></video>
      <div style={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
        <input
          type="text"
          value={streamKey} // Bind streamKey to input
          onChange={(e) => setStreamKey(e.target.value)} // Update streamKey on change
          style={{
            width: '100%',  // Make the video width 100% of its container
            maxWidth: '600px',
            borderRadius: '5px',
            boxShadow: '0 0 5px rgba(220, 53, 69, 0.5)',
            border: '1px solid white',
            padding: '10px',
            fontSize: '1rem'
          }}
          placeholder="Enter YouTube streaming key"
          disabled={isStreaming}
        />
      </div>
      <div className='m-2'>
        <button onClick={startRecording} disabled={isStreaming} className="m-2 btn-primary" style={{backgroundColor: 'white'}}>
          Start Streaming
        </button>
        <button onClick={stopRecording} disabled={!isStreaming} className="m-2 btn-primary" style={{backgroundColor: 'white'}}>
          Stop Streaming
        </button>
      </div>
    </div>
  );
};

export default VideoStream;
