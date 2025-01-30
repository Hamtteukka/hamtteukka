import { DefaultBodyType, PathParams, StrictRequest } from 'msw';

export interface TMockRequest {
  request: StrictRequest<DefaultBodyType>;
  params: PathParams;
}
