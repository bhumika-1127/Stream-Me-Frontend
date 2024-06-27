import React, { useState } from 'react';
import VideoStream from './VideoStream';

const headingStyle = {
  fontFamily: "Lora",
  fontWeight: 700, 
  fontSize: '36px', 
  color: 'black', // Dark gray text color
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', // Adds a subtle shadow
  letterSpacing: '1px', // Adds some spacing between letters
  margin: '16px' 
};

function Content() {
  const [isStreaming, setIsStreaming] = useState(false);

  return (
    <div className="App">
      <h1 className='m-3' style={headingStyle}>STREAM ME</h1>
      <VideoStream isStreaming={isStreaming} setIsStreaming={setIsStreaming} />
    </div>
  );
}

export default Content;