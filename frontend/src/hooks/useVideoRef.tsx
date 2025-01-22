import { useRef } from 'react';

export const useVideoRef = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const setStream = (stream: MediaStream) => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  };

  return { videoRef, setStream };
};
