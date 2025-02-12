import { TUser } from '@/types/user';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PUserStore extends TUser {
  nickname: string;
  profileId: string;
  isLogin: boolean;
  login: (user: TUser) => void;
  logout: () => void;
}

export const useUserStore = create(
  persist<PUserStore>(
    (set) => ({
      nickname: '',
      profileId: '',
      isLogin: false,

      login: (user: TUser) => {
        set({ nickname: user.nickname, profileId: user.profileId, isLogin: true });
      },

      logout: () => {
        set({ nickname: '', profileId: '', isLogin: false });
      },
    }),
    {
      name: 'userStorage',
    },
  ),
);
