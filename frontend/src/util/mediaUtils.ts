export const getDeviceId = async (): Promise<string | null> => {
  try {
    await navigator.mediaDevices.getUserMedia({ video: true });

    const allDevices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = allDevices.filter((device) => device.kind === 'videoinput');

    if (videoDevices.length > 0) {
      return videoDevices[0].deviceId;
    } else {
      console.error('비디오 장치가 없습니다.');
      return null;
    }
  } catch (err) {
    console.error('카메라에 접근할 수 없습니다. :', err);
    return null;
  }
};

export const setupCamera = async (deviceId: string): Promise<MediaStream | null> => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { deviceId },
    });

    return stream;
  } catch (err) {
    console.error('카메라 설정에 실패하였습니다. :', err);
    return null;
  }
};
