import { DefaultBodyType, PathParams, StrictRequest } from 'msw';
import { TUser } from '@/types/user';

export interface TMockRequest {
  request: StrictRequest<DefaultBodyType>;
  params: PathParams;
}

export interface TResponse {
  status: string;
  message: string;
}
export interface TResponseData<T> extends TResponse {
  data: T;
}

export interface TCursorData<T> {
  items: Array<T>;
  hasNextItems: boolean;
  nextCursorId: number;
}

export interface TAuthRedirectUrl {
  url: string;
  user?: TUser;
}
