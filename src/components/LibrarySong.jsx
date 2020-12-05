import React from "react";

const LibrarySong = ({
  currentSong,
  songs,
  setCurrentSong,
  id,
  setIsPlaying,
  audioRef,
  isPlaying,
  setSongs,
}) => {
  const songSelectHandler = async () => {
    const selectedSong = songs.filter((state) => {
      return state.id === id;
    });
    await setCurrentSong(selectedSong[0]);
    const newSongs = songs.map((song) => {
      if (song.id === id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return { ...song, active: false };
      }
    });
    setSongs(newSongs);
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then((audio) => {
          audioRef.current.play();
        });
      }
    }
  };

  return (
    <div
      className={`library-song ${currentSong.active ? "selected" : ""}`}
      onClick={songSelectHandler}
    >
      <img alt={currentSong.name} src={currentSong.cover} />
      <div className="song-description">
        <h3>{currentSong.name}</h3>
        <h4>{currentSong.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
