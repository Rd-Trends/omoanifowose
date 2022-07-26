import { useState, useEffect, useRef } from "react";

import WaveSurfer from "wavesurfer.js";

import jsmediatags from "../lib/jsmediatags/jsmediatags.min.js";

const useAudioControl = (audioSrc, trackList) => {
  const waveFormRef = useRef(null);
  const wavesurfer = useRef(null);
  const animationRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [MusicEnded, setMusicEnded] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [audioTitle, setAudioTitle] = useState("");
  const [audioArtist, setAudioArtist] = useState("");
  const [audioAlbum, setaudioAlbum] = useState("");

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      wavesurfer.current = WaveSurfer.create({
        container: waveFormRef.current,
        height: window.innerWidth > 320 ? 40 : 20,
        waveColor: "lightgrey",
        progressColor: "#0B5ED7",
        backend: "MediaElement",
        barGap: 3,
        barWidth: 3,
        barHeight: 1,
        barRadius: 1.5,
        cursorWidth: 0,
        skipLength: 30,
        scrollParent: false,
      });
      setIsPlaying(wavesurfer.current?.isPlaying());

      wavesurfer.current?.on("finish", () => {
        wavesurfer.current.setMute(false);
        setMusicEnded(true);
      });

      //  ** update current time when user clicks on audio waveform
      wavesurfer.current?.on("seek", () => {
        whilePlaying();
      });
    }

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    jsmediatags.read(audioSrc ? audioSrc : trackList[activeIndex].src, {
      onSuccess: function (tag) {
        if (mounted) {
          getImageSrc(tag.tags.picture?.data, tag.tags.picture?.format);
          setAudioArtist(tag.tags.artist);
          setAudioTitle(tag.tags.title);
          setaudioAlbum(tag.tags.album);
        }
      },
      onError: function (error) {
        console.log(error);
      },
    });
    wavesurfer.current?.load(audioSrc ? audioSrc : trackList[activeIndex].src);
    wavesurfer.current?.on("waveform-ready", () => {
      if (mounted) {
        setIsPlayerReady(true);
        if (MusicEnded) {
          setMusicEnded(false);
        }
        setDuration(wavesurfer.current.getDuration());
        if (isPlaying) {
          wavesurfer.current.play();
        }
        if (isMute) {
          wavesurfer.current.setMute(true);
        }
      }
    });

    return () => {
      mounted = false;
    };
  }, [audioSrc, activeIndex]);

  useEffect(() => {
    if (MusicEnded) {
      if (trackList) {
        if (activeIndex !== trackList.length - 1) {
          setActiveIndex((prev) => prev + 1);
          setIsPlayerReady(false);
        } else {
          setIsPlaying(false);
          wavesurfer.current.stop();
          setMusicEnded(false);
        }
      } else {
        setIsPlaying(false);
        wavesurfer.current.stop();
        setMusicEnded(false);
      }
    }
  }, [MusicEnded]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (isPlaying) {
        whilePlaying();
      }
    }

    return () => {
      mounted = false;
    };
  }, [isPlaying]);

  const togglePlayer = () => {
    wavesurfer.current?.playPause();
    setIsPlaying(wavesurfer.current?.isPlaying());
  };

  const whilePlaying = () => {
    setCurrentTime(wavesurfer.current.getCurrentTime());
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const toggleMute = () => {
    wavesurfer.current.toggleMute();
    setIsMute(wavesurfer.current?.getMute());
  };

  const skipForward = () => {
    wavesurfer.current.skipForward();
    if (!isPlaying) {
      whilePlaying();
    }
  };

  const nextMusic = () => {
    setIsPlayerReady(false);
    if (activeIndex !== trackList.length - 1) {
      setActiveIndex((prevIndex) => prevIndex + 1);
      // abg();
    }
  };

  const previousMusic = () => {
    setIsPlayerReady(false);
    if (activeIndex !== 0) {
      setActiveIndex((prevIndex) => prevIndex - 1);
    }
  };

  const skipBackward = () => {
    wavesurfer.current.skipBackward();
    if (!isPlaying) {
      whilePlaying();
    }
  };

  const changeTrackIndex = (index) => {
    setActiveIndex(index);
  };

  const getImageSrc = (data, format) => {
    if (data) {
      let base64String = "";
      for (const i = 0; i < data.length; i++) {
        base64String += String.fromCharCode(data[i]);
      }
      setImageSrc(`data:${data.format};base64,${window.btoa(base64String)}`);
    }
  };

  return {
    audioTitle,
    audioAlbum,
    audioArtist,
    isMute,
    imageSrc,
    isPlaying,
    isPlayerReady,
    duration,
    currentTime,
    waveFormRef,
    togglePlayer,
    toggleMute,
    skipBackward,
    skipForward,
    activeIndex,
    changeTrackIndex,
    nextMusic,
    previousMusic,
  };
};

export default useAudioControl;
