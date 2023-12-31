import React, { useEffect } from 'react';

// MP3 PLAYER COMPONENT FOR THE SPANISH PART OF THE PAGE

const AudioPlayerSpanish = ({ mp3Url }) => {
    useEffect(() => {
        const audioElement = document.getElementById('audioElementSpanish');
        audioElement.src = mp3Url;
    }, [mp3Url]);

    return (
        <div>
            <audio controls id="audioElementSpanish">
                <source src={mp3Url} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

export default AudioPlayerSpanish;
