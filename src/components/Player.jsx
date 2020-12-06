import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  currentSong,
  isPlaying,
  setSongInfo,
  songInfo,
  setIsPlaying,
  audioRef,
  songs,
  setCurrentSong,
}) => {
  //-----------------------------EventHandlers-----------------------------

  const skipTrackHandler = (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    console.log("currentIndex: " + currentIndex);
    console.log(songs.length);
    if (direction === "skip-back" && currentIndex !== 0) {
      setCurrentSong(songs[currentIndex - 1]);
    } else if (
      direction === "skip-forward" &&
      currentIndex + 1 !== songs.length
    ) {
      setCurrentSong(songs[currentIndex + 1]);
    }
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  //-----------------------JSX/UI-----------------------------------------
  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          onChange={dragHandler}
          type="range"
        />
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        {songs.findIndex((song) => song.id === currentSong.id) === 0 ? null : (
          <FontAwesomeIcon
            className="skip-back"
            onClick={() => skipTrackHandler("skip-back")}
            size="2x"
            icon={faAngleLeft}
          />
        )}
        {isPlaying ? (
          <FontAwesomeIcon
            className="play"
            size="2x"
            icon={faPause}
            onClick={playSongHandler}
          />
        ) : (
          <FontAwesomeIcon
            className="play"
            size="2x"
            icon={faPlay}
            onClick={playSongHandler}
          />
        )}
        {songs.findIndex((song) => song.id === currentSong.id) + 1 ===
        songs.length ? null : (
          <FontAwesomeIcon
            className="skip-forward"
            size="2x"
            onClick={() => skipTrackHandler("skip-forward")}
            icon={faAngleRight}
          />
        )}
      </div>
    </div>
  );
};

export default Player;
