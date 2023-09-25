import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { ToyIndex } from '../pages/ToyIndex';
import { ToyFilter } from './ToyFilter';
import { useEffect, useState } from 'react'

export function Dictaphone({setRecording}) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  console.log('transcripr', transcript)
  console.log('listening', listening)


  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }


  useEffect(() => {
    setRecording(transcript)
  }, [transcript])
  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
};
export default Dictaphone;

// ToyIndex
// const [recording, setRecording] = useState('')
// function onSetRecording(record) {
//   setRecording(record)
// }

{/* <Dictaphone onSetRecording={onSetRecording}/> */ }
{/* <ToyFilter recording={recording}/> */ }