import React, { useEffect } from 'react';

// MP3 PLAYER COMPONENT FOR THE ENGLISH PART OF THE PAGE

const AudioPlayerEnglish = ({ mp3Url }) => {
    useEffect(() => {
        const audioElement = document.getElementById('audioElementEnglish');
        audioElement.src = mp3Url;
    }, [mp3Url]);

    return (
        <div>
            <audio controls id="audioElementEnglish">
                <source src={mp3Url} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

export default AudioPlayerEnglish;
