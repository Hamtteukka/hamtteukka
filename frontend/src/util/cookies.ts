import { cookies } from 'next/headers';

export function getAuthCookies() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!accessToken || !refreshToken) {
    return null;
  }

  return `accessToken=${accessToken};refreshToken=${refreshToken};`;
}
