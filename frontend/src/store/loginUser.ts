import { TUser } from '@/types/user';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PUserStore {
  userId: number;
  nickname: string;
  profileId: string;
  isLogin: boolean;
  login: (user: TUser) => void;
  logout: () => void;
}

export const useUserStore = create(
  persist<PUserStore>(
    (set) => ({
      userId: -1,
      nickname: '',
      profileId: '',
      isLogin: false,

      login: (user: TUser) => {
        set({ userId: user.userId, nickname: user.nickname, profileId: user.profileId, isLogin: true });
      },

      logout: () => {
        set({ userId: -1, nickname: '', profileId: '', isLogin: false });
      },
    }),
    {
      name: 'userStorage',
    },
  ),
);
