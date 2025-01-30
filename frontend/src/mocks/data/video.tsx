export const MVideoRoomList: TVideoRoom[] = Array.from({ length: 16 }, () => ({
  sessionId: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
  title: '같이 조용히 뜨개질해요',
  hostName: '설핢',
  hostImg: '/image/profile.png',
  videoImg: '/image/video_preview.png',
  currentUsers: 4,
  maxUsers: 8,
}));
