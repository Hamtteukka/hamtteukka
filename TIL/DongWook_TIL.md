# 김동욱_TIL

## 2025-01-13
- 협업을 위한 jira 활용법 학습
- JPA 학습

## 2025-01-14
- ERD 설계 

- API 문서 작성법에 대한 학습

[kakao API 문서 작성 가이드] (https://tech.kakaoenterprise.com/127)

## 2025-01-15
- ERD 설계 수정할 점
    - image 테이블을 분리하자 => Pinterest처럼 텍스트 보다는 이미지 위주의 서비스이기 때문 
    - url을 DB에 저장 x => ID를 저장
    - WebRTC 관련 테이블 => 단발성 서비스이므로 room 테이블 DB에 저장할 필요x (필요시 redis에)

- 이미지 업로드 방식 결정
    - Presigned Url vs MultipartFile => SNS서비스이기에 보안보다는 로딩딩속도에 장점이 있는 Presigned Url으로 선택
    - 기술 블로그 참고

- Git flow vs GitHub flow

