import { TUser } from '@/types/user';
import { create } from 'zustand';

// TODO: 로그인, 로그아웃 기능 관리
export const useLoginUser = create<TUser>((set) => ({
  nickname: '서로',
  profileId: '',
}));
