interface TSessionId {
  sessionId: string;
}

interface TVideoRoom extends TSessionId {
  token: string;
  title: string;
  hostNickname: string;
  hostProfileImg: string;
  videoImg: string;
  presentPeople: number;
  capacity: number;
}
