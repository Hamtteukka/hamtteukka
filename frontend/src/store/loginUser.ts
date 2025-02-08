import { TUser } from '@/types/user';
import { create } from 'zustand';

interface PLoginUserState extends TUser {
  isLogin: boolean;
  login: (user: TUser) => void;
  logout: () => void;
}

export const useLoginUser = create<PLoginUserState>((set) => ({
  nickname: '',
  profileId: '',
  isLogin: false,

  login: (user: TUser) => set({ nickname: user.nickname, profileId: user.profileId, isLogin: true }),
  logout: () => set({ nickname: '', profileId: '', isLogin: false }),
}));
