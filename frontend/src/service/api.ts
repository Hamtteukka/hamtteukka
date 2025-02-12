import { TSubscriptionProfile } from '@/types/archive';
import { TDotPattern, TTextPattern, TTextPatternInstruction } from '@/types/pattern';
import { TAuthRedirectUrl, TCursorData, TResponseData } from '@/types/service';
import { TUser } from '@/types/user';

export const pattern = {
  generateTextPattern: async (body: TTextPatternInstruction): Promise<TResponseData<TTextPattern>> => {
    return fetch('/api/ai/description', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(body),
      credentials: 'include',
    }).then((res) => res.json());
  },
  generateDotPattern: async (formData: FormData): Promise<TResponseData<TDotPattern>> => {
    return fetch('/api/ai/dot', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    }).then((res) => res.json());
  },
};

export const openvidu = {
  createSession: async (formData: FormData): Promise<TResponseData<TSessionId>> => {
    return fetch('/api/openvidu/sessions', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    }).then((res) => res.json());
  },

  createToken: async (sessionId: string): Promise<TResponseData<TVideoRoom>> => {
    return fetch(`/api/openvidu/sessions/${sessionId}/connections`, {
      credentials: 'include',
    }).then((res) => res.json());
  },

  getVideoRoomList: async (): Promise<TResponseData<TVideoRoom[]>> => {
    return fetch('/api/openvidu/sessions', {
      credentials: 'include',
    }).then((res) => res.json());
  },

  leaveVideoRoom: async (sessionId: string) => {
    return fetch(`/api/openvidu/sessions/${sessionId}`, {
      method: 'DELETE',
      credentials: 'include',
    }).then((res) => res.json());
  },
};

export const auth = {
  getKakaoToken: async (code: string): Promise<TResponseData<TAuthRedirectUrl>> => {
    return fetch('/api/auth/kakao', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ code }),
      credentials: 'include',
    }).then((res) => res.json());
  },

  signUp: async (formData: FormData): Promise<TResponseData<TUser>> => {
    return fetch('/api/auth/signup', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    }).then((res) => res.json());
  },
};

export const home = {
  getPostList: async (cursorId: number, limit: number): Promise<TResponseData<TCursorData<TFeedPreview>>> => {
    const params = new URLSearchParams({
      cursorId: cursorId === -1 ? '' : cursorId.toString(),
      limit: limit.toString(),
    });
    return fetch(`/api/feeds/search?${params}`, {
      cache: 'no-store',
      credentials: 'include',
    }).then((res) => res.json());
  },
};

export const newFeed = {
  createFeed: async (formData: FormData): Promise<TResponseData<TFeedId>> => {
    return fetch('/api/feeds', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    }).then((res) => res.json());
  },
};

export const profile = {
  getUserPostList: async (
    userId: string,
    cursorId: number,
    limit: number,
  ): Promise<TResponseData<TCursorData<TFeedPreview>>> => {
    const params = new URLSearchParams({
      cursorId: cursorId === -1 ? '' : cursorId.toString(),
      limit: limit.toString(),
    });
    return fetch(`/api/feeds/${userId}/list?${params}`, {
      cache: 'no-store',
      credentials: 'include',
    }).then((res) => res.json());
  },

  getUserPatternList: async (
    userId: string,
    cursorId: number,
    limit: number,
  ): Promise<TResponseData<TCursorData<TFeedPreview>>> => {
    const params = new URLSearchParams({
      cursorId: cursorId === -1 ? '' : cursorId.toString(),
      limit: limit.toString(),
    });
    return fetch(`/api/feeds/${userId}/ai-list?${params}`, {
      cache: 'no-store',
      credentials: 'include',
    }).then((res) => res.json());
  },
};

export const archive = {
  getSubscriptionList: async (): Promise<TResponseData<TSubscriptionProfile[]>> => {
    return fetch('/api/users/subscription', {
      credentials: 'include',
    }).then((res) => res.json());
  },

  getStoredPostList: async (cursorId: number, limit: number): Promise<TResponseData<TCursorData<TFeedPreview>>> => {
    const params = new URLSearchParams({
      cursorId: cursorId === -1 ? '' : cursorId.toString(),
      limit: limit.toString(),
    });
    return fetch(`/api/feeds/saved-list?${params}`, {
      cache: 'no-store',
      credentials: 'same-origin',
    }).then((res) => res.json());
  },
  getStoredPatternList: async (cursorId: number, limit: number): Promise<TResponseData<TCursorData<TFeedPreview>>> => {
    const params = new URLSearchParams({
      cursorId: cursorId === -1 ? '' : cursorId.toString(),
      limit: limit.toString(),
    });
    return fetch(`/api/feeds/saved-ai-list?${params}`, {
      cache: 'no-store',
      credentials: 'same-origin',
    }).then((res) => res.json());
  },
};
