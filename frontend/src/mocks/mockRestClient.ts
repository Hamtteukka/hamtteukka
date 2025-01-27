import { DefaultBodyType, HttpHandler, HttpResponseResolver, PathParams, ResponseResolver, http } from 'msw';

// Mocking Rest Handler에 타입
type MockingRestHandler<
  RequestBodyType extends DefaultBodyType = DefaultBodyType,
  Params extends PathParams<keyof Params> = PathParams,
  ResponseBody extends DefaultBodyType = DefaultBodyType,
> = (path: string, resolver: HttpResponseResolver<PathParams, DefaultBodyType, undefined>) => HttpHandler;

// // MockRestClient을 정의하는 인터페이스
interface IMockRestClient {
  get: MockingRestHandler;
  post: MockingRestHandler;
  put: MockingRestHandler;
  delete: MockingRestHandler;
  patch: MockingRestHandler;
  options: MockingRestHandler;
}

// MockRestClient는 RESTful API 작업을 Mocking하기 위한 Client

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const MockRestClient = (() => {
  // 환경(서버/클라이언트)에 따라 적절한 URL을 반환하는 함수
  const resolveURL = (url: string): string => {
    if (typeof window === 'undefined') {
      // 노드 환경이면 서버 URL을 붙여서 반환한다.
      return `${baseUrl}${url}`;
    }
    // 클라이언트 환경이면 그대로 반환한다.
    return url;
  };

  // 주어진 URL이 FULL URL인지 확인하는 함수
  const isExternalUrl = (url: string): boolean => {
    return url.match(/^(https|http)/g) !== null;
  };

  // Mocking API URL을 정재하여 반환하는 함수
  const getMockApiUrl = (url: string): string => {
    // 외부 URL이면 그대로 반환하고 아니면 Mocking API URL로 변환하여 반환한다.
    return isExternalUrl(url) ? url : resolveURL(url);
  };

  // Mocking API를 위한 Client
  const _mockRestClient: IMockRestClient = {
    get: (url: string, resolver) => http.get(getMockApiUrl(url), resolver),
    post: (url, resolver) => http.post(getMockApiUrl(url), resolver),
    put: (url, resolver) => http.put(getMockApiUrl(url), resolver),
    patch: (url, resolver) => http.patch(getMockApiUrl(url), resolver),
    delete: (url, resolver) => http.delete(getMockApiUrl(url), resolver),
    options: (url, resolver) => http.options(getMockApiUrl(url), resolver),
  };

  return _mockRestClient;
})();

export { MockRestClient };
