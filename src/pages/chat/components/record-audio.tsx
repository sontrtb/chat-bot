import WavesurferPlayer from "@wavesurfer/react";
import { useState } from "react";
import WaveSurfer from "wavesurfer.js";

function RecordAudio() {

    const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)

    const onReady = (ws: WaveSurfer) => {
        setWavesurfer(ws)
        setIsPlaying(false)
    }

    return (
        <WavesurferPlayer
            height={100}
            waveColor="violet"
            url="/my-server/audio.wav"
            onReady={onReady}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
        />
    )
}

export default RecordAudio;