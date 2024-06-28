import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const socket = io(`${window.location.origin}`); // Connect to the backend server

const VideoStream = ({ isStreaming, setIsStreaming }) => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [streamKey, setStreamKey] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

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
    if (mediaStream && streamKey) {
      socket.emit('startstream', streamKey);

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
      socket.emit('stopstream');
      setIsStreaming(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        muted
        style={{
          width: '100%',
          maxWidth: '600px',
          border: '5px solid black',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
        }}
        className='mb-3'
      ></video>
      <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
        <input
          type={showPassword ? 'text' : 'password'}
          value={streamKey}
          onChange={(e) => setStreamKey(e.target.value)}
          style={{
            width: '100%',
            borderRadius: '5px',
            boxShadow: '0 0 5px rgba(220, 53, 69, 0.5)',
            border: '1px solid white',
            padding: '10px',
            fontSize: '1rem',
            paddingRight: '60px', // Space for the link/button
          }}
          placeholder="Enter YouTube streaming key"
          disabled={isStreaming}
        />
        <button
          
          type="button"
          onClick={togglePasswordVisibility}
          style={{
            position: 'absolute',
            top: '50%',
            right: '1px',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            color: '#7c383e', // Bootstrap blue color
            cursor: 'pointer',
          }}
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>
      <div className='m-2'>
        <button onClick={startRecording} disabled={isStreaming} className="m-2 btn-primary" style={{ backgroundColor: 'white' }}>
          Start Streaming
        </button>
        <button onClick={stopRecording} disabled={!isStreaming} className="m-2 btn-primary" style={{ backgroundColor: 'white' }}>
          Stop Streaming
        </button>
      </div>
    </div>
  );
};

export default VideoStream;

