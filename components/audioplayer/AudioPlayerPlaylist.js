import PropTypes from "prop-types";
import Image from "next/image";

//  * perfect scrollbar
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

//  * components
import Tracklist from "./Tracklist";

//  * hooks
import useAudioControl from "hooks/useAudioControl";
import useDownloadMusic from "hooks/useDownloadMusic";

//  *utils
import { displayTime } from "@/utils/displayTime";

//  * icons
import {
  BsPlayFill,
  BsPauseFill,
  BsVolumeOffFill,
  BsVolumeMuteFill,
  BsCaretLeftFill,
  BsCaretRightFill,
} from "react-icons/bs";

//  * custom styles
import S from "@/styles/AudioPlayerPlaylist.module.scss";

//  * classname
import classNames from "classnames/bind";
const cx = classNames.bind(S);

const AudioPlayerPlaylist = ({ trackList, btnSize }) => {
  const {
    audioTitle,
    audioAlbum,
    audioArtist,
    isMute,
    imageSrc,
    isPlaying,
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
  } = useAudioControl(null, trackList);

  const downloadMusic = useDownloadMusic();

  const downloadMusicFromTracklist = (index) => {
    downloadMusic(trackList[index]);
  };

  const playPauseBtnClassname = cx({
    play_pause_btn: true,
    playing: isPlaying,
  });

  return (
    <>
      <div className={S.container}>
        <div className={S.audio_meta_and_control_section}>
          <div className={S.image_wrapper}>
            <Image
              src={imageSrc ? imageSrc : "/images/abg.jpg"}
              layout="fill"
            />
          </div>
          <div className={S.meta_and_audio_control}>
            <div className={S.audio_meta}>
              <p className={S.audio_title}>
                {audioTitle ? audioTitle : "Unknown"}
              </p>
              <p className={S.audio_artist}>
                {audioArtist ? audioArtist : "Unknown"}
              </p>
            </div>
            <div className={S.audio_controls}>
              <button onClick={previousMusic} title="previous">
                <BsCaretLeftFill size={btnSize} />
              </button>
              <button
                title={isPlaying ? "Pause" : "Play"}
                onClick={togglePlayer}
                className={playPauseBtnClassname}
              >
                {isPlaying ? (
                  <BsPauseFill size={1.2 * btnSize} />
                ) : (
                  <BsPlayFill size={1.2 * btnSize} />
                )}
              </button>
              <button onClick={nextMusic} title="next">
                <BsCaretRightFill size={btnSize} />
              </button>
              <button title={isMute ? "Unmute" : "Mute"} onClick={toggleMute}>
                {isMute ? (
                  <BsVolumeMuteFill size={btnSize} />
                ) : (
                  <BsVolumeOffFill size={btnSize} />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className={S.wavesurfer_duration_section}>
          <div className="d-flex align-items-center justify-content-between w-100">
            <div className={S.wavesurfer_wrapper} ref={waveFormRef}></div>
          </div>

          <div
            className={`d-flex align-items-center justify-content-between w-100 ${S.audio_time_display_wrapper}`}
          >
            <small>{displayTime(duration)}</small>
            <small>{displayTime(currentTime)}</small>
          </div>
        </div>
        <PerfectScrollbar options={{ wheelSpeed: 1 }}>
          <Tracklist
            trackList={trackList}
            changeTrackindex={changeTrackIndex}
            downloadMusic={downloadMusicFromTracklist}
            activeIndex={activeIndex}
          />
        </PerfectScrollbar>
      </div>
    </>
  );
};

AudioPlayerPlaylist.defaultProps = {
  btnSize: 25,
};

AudioPlayerPlaylist.propTypes = {
  trackList: PropTypes.array.isRequired,
  btnSize: PropTypes.number,
};

export default AudioPlayerPlaylist;
