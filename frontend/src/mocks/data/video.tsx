export const MVideoRoomList: TVideoRoom[] = Array.from({ length: 16 }, () => ({
  token: '1',
  sessionId: '1',
  title: '같이 조용히 뜨개질해요',
  hostNickname: '설핢',
  hostProfileImg: '/image/profile.png',
  videoImg: '/image/video_preview.png',
  presentPeople: 4,
  capacity: 8,
}));

export const MSessionId: TSessionId = {
  sessionId: '1',
};
