import React, { useEffect, useRef, useState } from "react";
import "./MusicControl.css";

// Reimplementação em React do player de abertura que antes vivia no index.html.
// Botão discreto de play/pause, alinhado ao visual do redesign.
const AUDIO_SRC = process.env.PUBLIC_URL + "/Abertura.m4a";

export default function MusicControl() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  // Tenta iniciar automaticamente (como o autoplay antigo). Navegadores costumam
  // bloquear autoplay com som antes de uma interação: nesse caso, apenas fica pausado.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.4;
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <button
        type="button"
        className="music-btn"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? "Pausar música" : "Tocar música"}
        title={playing ? "Pausar música" : "Tocar música"}
      >
        {playing ? (
          // Alto-falante com ondas (tocando)
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M11 5 6 9H2v6h4l5 4V5z" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
            <path d="M19 5a9 9 0 0 1 0 14" />
          </svg>
        ) : (
          // Alto-falante mudo (pausado)
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M11 5 6 9H2v6h4l5 4V5z" />
            <line x1="22" y1="9" x2="16" y2="15" />
            <line x1="16" y1="9" x2="22" y2="15" />
          </svg>
        )}
      </button>
      <audio ref={audioRef} src={AUDIO_SRC} loop preload="auto" />
    </>
  );
}
