import heic2any from 'heic2any';
import Resizer from 'react-image-file-resizer';

export const addFile = (multiple: boolean, setFile: (file: File) => void) => {
  if (typeof window === 'undefined') return;

  const input = document.createElement('input');
  input.type = 'file';
  // 파일 형식 지정
  input.accept = '.jpeg, .jpg, .png, .heic';
  if (multiple) input.multiple = true;
  input.onchange = async (e) => {
    const files = (e.target as HTMLInputElement).files;
    if (!files) return;
    handleFile(files, setFile);
  };
  input.click();
};

export const handleFile = async (files: FileList, setFile: (file: File) => void) => {
  const fileList: File[] = [];
  for (let i = 0; i < Math.min(files.length, 8); i++) {
    // 파일 크기 제한
    if (files[i].size > 10 * 1024 * 1024) {
      alert('파일 크기는 10MB 이하로 제한됩니다.');
      return;
    }
    fileList.push(files[i]);
  }
  for await (let file of fileList) {
    // .heic 확장자를 갖는 경우
    if (/\.(heic)$/i.test(file.name)) {
      file = await changeHeicToJpeg(file);
    }
    if (!file) {
      return;
    }
    setFile(file);
  }
};

const changeHeicToJpeg = async (file: File) => {
  const convertedBlob = (await heic2any({ blob: file, toType: 'image/png' })) as File;

  // 변환된 파일의 이름 설정 (원본 이름에서 확장자 변경)
  const newFileName = file.name.replace(/\.heic$/i, '.png');

  // 변환된 Blob을 File 객체로 변환
  const convertedFile = new File([convertedBlob], newFileName, {
    type: 'image/png',
  });

  const resizedFile = (await resizeFile(convertedFile)) as File;
  return resizedFile;
};

const resizeFile = (file: File) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(file, 800, 800, 'png', 100, 0, (uri) => resolve(uri), 'file');
  });
