import { PublisherProperties } from 'openvidu-browser';

export const publisherProperties: PublisherProperties = {
  audioSource: undefined,
  videoSource: undefined,
  publishAudio: true,
  publishVideo: true,
  resolution: '640x480',
  frameRate: 30,
  insertMode: 'APPEND',
  mirror: false,
};
