import PropTypes from "prop-types";

import Track from "./Track";
import S from "@/styles/AudioPlayerPlaylist.module.scss";

const Tracklist = ({
  trackList,
  activeIndex,
  changeTrackindex,
  downloadMusic,
}) => {
  return (
    <ol className={S.tracklist}>
      {trackList.map((track, index) => {
        return (
          <Track
            key={index}
            track={track.src}
            index={index}
            handleClick={changeTrackindex}
            downloadMusic={downloadMusic}
            activeIndex={activeIndex}
          />
        );
      })}
    </ol>
  );
};

Tracklist.propTypes = {
  trackList: PropTypes.array.isRequired,
  activeIndex: PropTypes.number.isRequired,
  changeTrackindex: PropTypes.func.isRequired,
  downloadMusic: PropTypes.func,
};

export default Tracklist;
