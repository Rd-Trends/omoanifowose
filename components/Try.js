import React, { useEffect, useCallback, useRef } from "react";
// libraries
import "video.js/dist/video-js.css";
import videojs from "video.js";

import "webrtc-adapter";
import RecordRTC from "recordrtc";

//  import wavesurfer
import WaveSurfer from "wavesurfer.js";
import MicrophonePlugin from "wavesurfer.js/dist/plugin/wavesurfer.microphone.js";
WaveSurfer.microphone = MicrophonePlugin;

// Register videojs-wavesurfer plugin
import "videojs-wavesurfer/dist/css/videojs.wavesurfer.css";
import Wavesurfer from "videojs-wavesurfer/dist/videojs.wavesurfer.js";

// register videojs-record plugin with this import
import "videojs-record/dist/css/videojs.record.css";
import Record from "videojs-record/dist/videojs.record.js";

import PropTypes from "prop-types";

const videoJsOptions = {
  controls: true,
  autoplay: false,
  loop: false,
  muted: false,
  fluid: false,
  width: 400,
  height: 300,
  bigPlayButton: false,
  plugins: {
    wavesurfer: {
      backend: "WebAudio",
      displayMilliseconds: true,
      barWidth: 3,
      barGap: 1.5,
      barRadius: 3,
      debug: true,
      waveColor: "purple",
      progressColor: "violet",
      cursorColor: "black",
      hideScrollbar: true,
      plugins: [
        // enable microphone plugin
        WaveSurfer.microphone.create({
          bufferSize: 4096,
          numberOfInputChannels: 1,
          numberOfOutputChannels: 1,
          constraints: {
            video: false,
            audio: true,
          },
        }),
      ],
    },
    record: {
      audio: true,
      video: false,
      maxLength: 20,
      displayMilliseconds: true,
      debug: true,
    },
  },
};

const WaveSurferRecorder = ({}) => {
  // **  refs
  const recorder = useRef(null);

  const audioRef = useCallback((node) => {
    if (node !== null) {
      recorder.current = videojs(node.id, videoJsOptions, () => {
        // print version information at startup
        const version_info =
          "Using video.js " +
          videojs.VERSION +
          " with videojs-record " +
          videojs.getPluginVersion("record") +
          " and recordrtc " +
          RecordRTC.version;
        videojs.log(version_info);
      });

      // device is ready
      recorder.current.on("deviceReady", () => {
        console.log("device is ready!");
      });

      // user clicked the record button and started recording
      recorder.current.on("startRecord", () => {
        console.log("started recording!");
      });

      // user completed recording and stream is available
      recorder.current.on("finishRecord", () => {
        // recordedData is a blob object containing the recorded data that
        // can be downloaded by the user, stored on server etc.
        console.log("finished recording: ", recorder.current.recordedData);
      });

      // error handling
      recorder.current.on("error", (element, error) => {
        console.warn(error);
      });

      recorder.current.on("deviceError", () => {
        console.error("device error:", recorder.current.deviceErrorCode);
      });
    }
  }, []);

  return (
    <>
      <button onClick={() => player.current.wavesurfer.microphone.start()}>
        start
      </button>
      <div data-vjs-player>
        <audio
          // style={{ backgroundColor: "white" }}
          id="myAudio"
          ref={audioRef}
          className="video-js vjs-default-skin"
        ></audio>
      </div>
      {/* <WaveForm container={audioRef}/> */}
      {/* <WaveSurfer plugins={plugins} container="myAudio" /> */}
    </>
  );
};

WaveSurferRecorder.propTypes = {};

export default WaveSurferRecorder;
