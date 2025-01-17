# 김동욱_TIL

<details>
<summary><h2>2025-01-13 학습</h2></summary>
<div markdown="1">

- 협업을 위한 jira 활용법 학습 
- JPA 학습

</div>
</details>

<details>
<summary><h2>2025-01-14 학습</h2></summary>
<div markdown="1">

- ERD 설계 

- API 문서 작성법에 대한 학습

[kakao API 문서 작성 가이드] (https://tech.kakaoenterprise.com/127)

</div>
</details>

<details>
<summary><h2>2025-01-15 학습</h2></summary>
<div markdown="1">

- ERD 설계 수정할 점
    - image 테이블을 분리하자 => Pinterest처럼 텍스트 보다는 이미지 위주의 서비스이기 때문 
    - url을 DB에 저장 x => ID를 저장
    - WebRTC 관련 테이블 => 단발성 서비스이므로 room 테이블 DB에 저장할 필요x (필요시 redis에)

- 이미지 업로드 방식 결정
    - Presigned Url vs MultipartFile => SNS서비스이기에 보안보다는 로딩딩속도에 장점이 있는 Presigned Url으로 선택
    - 기술 블로그 참고

- Git flow vs GitHub flow

</div>
</details>

<details>
<summary><h2>2025-01-16 학습</h2></summary>

- ERD 설계를 위한 JPA annotation 학습

=> `GenerationType.SEQUENCE`와 기본 전략(`GenerationType.AUTO`)의 차이?

### **`GenerationType.SEQUENCE`와 `GenerationType.AUTO` 차이점**

| 특징                           | `GenerationType.SEQUENCE`                    | `GenerationType.AUTO`                          |
|--------------------------------|----------------------------------------------|-----------------------------------------------|
| **ID 생성 방식**               | 데이터베이스의 시퀀스 호출                   | 데이터베이스 방언에 따라 자동 설정             |
| **시퀀스 생성**                | 명시적으로 `CREATE SEQUENCE` 수행            | 데이터베이스에 따라 다름 (MySQL은 사용 안 함)  |
| **데이터베이스 의존성**        | 시퀀스를 지원하는 DB에서만 사용 가능          | 데이터베이스 방언(dialect)에 따라 동작         |
| **주요 DB 동작**               | PostgreSQL: `SEQUENCE` 사용                  | MySQL: `AUTO_INCREMENT`, PostgreSQL: `SEQUENCE`|
| **성능**                       | 성능 우수 (시퀀스가 미리 값 생성)            | 데이터베이스 방언에 따라 달라짐                |
| **사용 사례**                  | 시퀀스를 명시적으로 관리하거나 PostgreSQL 등 | 데이터베이스 간 이식성을 고려하는 경우         |

- Cursor-based-Pagination?
    - 페이지네이션
    <div>
        1. Offset-based Pagination => offSet쿼리를 사용 <br>
        2. Cursor-based Pagination => 클라이언트가 가져간 마지막 row의 순서상 다음 row들을 n개 요청/응답하게 구현현
    </div>

</details>
