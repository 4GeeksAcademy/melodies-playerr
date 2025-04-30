import React, { useEffect, useRef, useState } from "react";

const Home = () => {

    const [songs, setSongs] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(null);
    const audioRef = useRef();

    const obtenerCanciones = async () => {
        try {
            const response = await fetch("https://playground.4geeks.com/sound/songs")
            console.log(response)
            const data = await response.json()
            console.log(data.songs)
            setSongs(data.songs)
        } catch (error) {
            console.log(error)
        }
    }

    const reproducir = (url, id) => {
        let apiSongs = "https://playground.4geeks.com"

        if (audioRef.current.paused) {

            audioRef.current.src = apiSongs.concat(url)
            audioRef.current.play()
        }
    }

    useEffect(() => {
        obtenerCanciones()
    }, [])



    return (
        <div className="container text-center">
            <h1>mi spotify</h1>
            <div className="d-flex justify-content-center">
                <div class="list-group">
                    {songs.map((cancion) => (
                        <button type="button" value={cancion} onClick={() => reproducir(cancion.url, cancion.id)} class="list-group-item list-group-item-action " aria-current="true">
                            {cancion.name}
                        </button>
                    ))}

                </div>
            </div>
            <audio ref={audioRef} controls>
                <source src={audioRef} type="audio/mp3" />
            </audio>
        </div>
    )
}
export default Home