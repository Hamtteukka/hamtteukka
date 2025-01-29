export const SUCCESS = 'success';

// URL
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const KAKAO_AUTHORIZE_URL = `${process.env.NEXT_PUBLIC_KAKAO_AUTH_URL}?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`;
