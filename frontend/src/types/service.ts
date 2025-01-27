import { DefaultBodyType, PathParams, StrictRequest } from 'msw';

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
