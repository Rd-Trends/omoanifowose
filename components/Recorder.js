import React, { useRef, useState, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import MicroPhone from "wavesurfer.js/dist/plugin/wavesurfer.microphone.min";

const Recorder = () => {
  const waveFormRef = useRef(null);
  const wavesurfer = useRef(null);
  let audioRecorder = useRef(null);
  const audioChunks = useRef([]);

  const [audioSrc, setAudioSrc] = useState("");

  useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: waveFormRef.current,
      waveColor: "violet",
      progressColor: "purple",
      backend: "MediaElement",
      plugins: [
        MicroPhone.create({
          bufferSize: 4096,
          numberOfInputChannels: 1,
          numberOfOutputChannels: 1,
          constraints: {
            video: false,
            audio: true,
          },
        }),
      ],
    });

    // wavesurfer.current?.load("/music/Hulvey_-_Matthews_Song.mp3");
    // wavesurfer.current?.on("ready", () => {
    //   console.log("ready");
    // });

    wavesurfer.current?.microphone?.on("deviceReady", (stream) => {
      audioRecorder.current = new MediaRecorder(stream);
      audioRecorder.current.start();

      audioRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
        console.log("data available");
      };

      audioRecorder.current.onstop = () => {
        const blob = new Blob(audioChunks.current);
        const audioUrl = URL.createObjectURL(blob);
        setAudioSrc(audioUrl);
      };
    });

    return () => wavesurfer.current.destroy();
  }, []);

  return (
    <div>
      <button onClick={() => wavesurfer.current.microphone.start()}>
        start
      </button>
      <button onClick={() => wavesurfer.current.microphone.play()}>play</button>
      <button onClick={() => audioRecorder.current.stop()}>stop</button>
      <div style={{ width: "400px" }} ref={waveFormRef}></div>

      <audio src={audioSrc} controls></audio>
    </div>
  );
};

export default Recorder;
