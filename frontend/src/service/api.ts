import { TDotPattern, TTextPattern, TTextPatternInstruction } from '@/types/pattern';
import { TCursorData, TResponseData } from '@/types/service';
import { TUser } from '@/types/user';

export const pattern = {
  generateTextPattern: async (body: TTextPatternInstruction): Promise<TResponseData<TTextPattern>> => {
    return fetch('/api/ai/description', {
      method: 'POST',
      body: JSON.stringify(body),
    }).then((res) => res.json());
  },
  generateDotPattern: async (formData: FormData): Promise<TResponseData<TDotPattern>> => {
    return fetch('/api/ai/dot', {
      method: 'POST',
      body: formData,
    }).then((res) => res.json());
  },
};

export const openvidu = {
  createSession: (formData: FormData): Promise<TResponseData<string>> => {
    return fetch('/api/openvidu/sessions', {
      method: 'POST',
      body: formData,
    }).then((res) => res.json());
  },

  createToken: (sessionId: string): Promise<TResponseData<string>> => {
    return fetch(`/api/openvidu/sessions/${sessionId}/connections`, {
      cache: 'no-store',
    }).then((res) => res.json());
  },
};

export const auth = {
  getKakaoToken: (code: string): Promise<Response> => {
    return fetch(`/api/auth/kakao`, {
      method: 'POST',
      body: JSON.stringify({ code }),
    });
  },

  signUp: async (body: TUser): Promise<TResponseData<TUser>> => {
    return fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(body),
    }).then((res) => res.json());
  },
};

export const archive = {
  getStoredPostList: async (cursorId: number, limit: number): Promise<TResponseData<TCursorData<TPostPreview>>> => {
    const params = new URLSearchParams({
      cursorId: cursorId === -1 ? '' : cursorId.toString(),
      limit: limit.toString(),
    });
    return fetch(`/api/feeds/saved-list?${params}`, {
      cache: 'no-store',
      credentials: 'same-origin',
    }).then((res) => res.json());
  },
  getStoredPatternList: async (cursorId: number, limit: number): Promise<TResponseData<TCursorData<TPostPreview>>> => {
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
