import { useEffect } from "react";
import PropTypes from "prop-types";
import Image from "next/image";

//  * content placeholder
import {
  ImagePlaceholder,
  WaveFormPlaceHolder,
  MetaPlaceholder,
} from "./Placeholder";

//  *icons
import {
  BsPlayFill,
  BsPauseFill,
  BsVolumeOffFill,
  BsVolumeMuteFill,
  BsDownload,
} from "react-icons/bs";

//  * hooks
import useAudioControl from "hooks/useAudioControl";
import useDownloadMusic from "hooks/useDownloadMusic";

//  *utils
import { displayTime } from "@/utils/displayTime";
import * as musicMetadata from "music-metadata-browser";

//  *custom style
import S from "../../styles/SimplePlayer.module.scss";

//  * classname
import classNames from "classnames/bind";
const cx = classNames.bind(S);

const SimplePlayer = ({ audioSrc, btnSize }) => {
  const {
    waveFormRef,
    togglePlayer,
    toggleMute,
    audioTitle,
    audioArtist,
    isMute,
    isPlayerReady,
    imageSrc,
    isPlaying,
    duration,
    currentTime,
  } = useAudioControl(audioSrc);

  const downloadMusic = useDownloadMusic();

  const playPauseBtnClassname = cx({
    play_pause_btn: true,
    playing: isPlaying,
  });

  // useEffect(() => {
  //   const getMusicMetaData = async () => {
  //     console.log(audioSrc);
  //     const metaData = await musicMetadata.fetchFromUrl(audioSrc);
  //     console.log(metaData);
  //   };

  //   getMusicMetaData();
  // }, [audioSrc]);

  return (
    <>
      <div className={S.simple_player_wrapper}>
        <div className={S.image_wrapper}>
          <ImagePlaceholder imageSrc={imageSrc}>
            <Image src={imageSrc} layout="fill" />
          </ImagePlaceholder>
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
        </div>

        <div
          className={`d-flex flex-column align-items-start justify-content-between ${S.audio_wrapper}`}
        >
          <div className="d-flex align-items-start justify-content-between w-100">
            <div className={S.audio_meta}>
              <MetaPlaceholder rows={2} isReady={audioArtist || audioTitle}>
                <p className={S.audio_title}>{audioTitle}</p>
                <p className={S.audio_artist}>{audioArtist}</p>
              </MetaPlaceholder>
            </div>

            <button
              title="Download"
              className={S.download_btn}
              onClick={() => downloadMusic(audioSrc)}
            >
              <BsDownload size={btnSize} />
            </button>
          </div>

          <div className="d-flex align-items-center justify-content-between w-100">
            <div className={S.wavesurfer_wrapper} ref={waveFormRef}>
              <WaveFormPlaceHolder isPlayerReady={isPlayerReady} />
            </div>
            <button title={isMute ? "Unmute" : "Mute"} onClick={toggleMute}>
              {isMute ? (
                <BsVolumeMuteFill size={btnSize} />
              ) : (
                <BsVolumeOffFill size={btnSize} />
              )}
            </button>
          </div>

          <div
            className={`d-flex align-items-center justify-content-between w-100 ${S.audio_time_display_wrapper}`}
          >
            <small>{displayTime(duration)}</small>
            <small>{displayTime(currentTime)}</small>
          </div>
        </div>
      </div>
      {/* <SimplePlayerSkeleton /> */}
    </>
  );
};

SimplePlayer.defaultProps = {
  btnSize: 30,
};

SimplePlayer.propTypes = {
  audioSrc: PropTypes.string.isRequired,
  btnSize: PropTypes.number,
};

export default SimplePlayer;
