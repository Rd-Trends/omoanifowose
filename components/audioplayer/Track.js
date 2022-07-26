import React from "react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { BsDownload } from "react-icons/bs";
import classNames from "classnames/bind";

//  * used for getting audio meta (title, image, artist-name)
import jsmediatags from "../../lib/jsmediatags/jsmediatags";

//  *custom styles
import S from "@/styles/AudioPlayerPlaylist.module.scss";

let cx = classNames.bind(S);

const Track = ({ track, index, activeIndex, handleClick, downloadMusic }) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    let mounted = true;
    if (track) {
      jsmediatags.read(track, {
        onSuccess: function (tag) {
          if (mounted) {
            setTitle(tag.tags.title);
          }
        },
        onError: function (error) {
          if (mounted) {
            setTitle("Unknown");
          }
        },
      });
    }

    return () => {
      mounted = false;
    };
  }, [track]);

  const positionInList = index + 1;

  const className = cx({
    track: true,
    activeTrack: index === activeIndex,
  });

  return (
    <li className={className}>
      <div className={S.title} onClick={() => handleClick(index)}>
        <p className={S.positionInList}>
          {positionInList < 10 ? `0${positionInList}.` : `${positionInList}.`}
        </p>
        <p>{title}</p>
      </div>
      <button onClick={() => downloadMusic(index)} title="download">
        <BsDownload />
      </button>
    </li>
  );
};

Track.propTypes = {
  track: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  activeIndex: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
  downloadMusic: PropTypes.func.isRequired,
};

export default Track;
