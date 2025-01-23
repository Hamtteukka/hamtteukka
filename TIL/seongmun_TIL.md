# TIL (Today I Learned)

<details>
<summary><h2>📖 2025-01-13 학습</h2></summary>

- AI를 활용한 서술형 도안 -> 기호 도안 변환 프롬프트 작성
- docker 공부 & JPA 공부
</details>

<details>
<summary><h2>📖 2025-01-14 학습</h2></summary>

### 도커의 볼륨(Volume)
- 도커 컨테이너에서 데이터를 영속적으로 저장하기 위한 방법
- 컨테이너 자체의 저장 공간을 사용하지 않고 호스트 자체의 저장 공간을 공유해서 사용하는 형태
```bash
$ docker run -v [호스트의 디렉토리 절대경로]:[컨테이너의 디렉토리 절대경로] [이미지명]:[태그명]
```
- [**호스트의 디렉토리 절대 경로**]에 디렉토리가 이미 존재할 경우 호스트의 디렉터리가 컨테이너의 디렉터리를 덮어씌움
- [**호스트의 디렉토리 절대 경로**]에 디렉토리가 존재하지 않을 경우 호스트의 디렉터리 절대 경로에 디렉터리를 새로 만들고 컨테이너의 디렉터리에 있는 파일들을 호스트의 디렉터리로 복사함함
</details>

<details>
<summary><h2>📖 2025-01-15 학습</h2></summary>

# 프로세스와 스레드

## 프로세스 (Process)

프로세스는 컴퓨터에서 실행 중인 하나의 프로그램을 의미
프로그램이 실행되면 운영체제는 디스크에 저장된 데이터를 메모리로 로드하여 실제 메모리 공간에 할당하고 CPU가 접근할 수 있는 상태가 됩니다

### 프로세스의 메모리 구조
프로세스의 메모리는 크게 4가지 구조를 가짐
- **코드(Code) 영역**  
  실행할 프로그램의 코드가 기계어로 컴파일되어 저장되는 영역으로 텍스트(text) 영역이라고도 함
  CPU는 코드 영역에 저장된 명령어를 하나씩 가져가서 처리하며 중간에 코드가 변경되지 않도록 Read-Only 형태로 저장됨

- **데이터(Data) 영역**  
  전역 변수, 정적(static) 변수, 배열, 구조체 등이 저장되는 영역
  데이터 영역은 세부적으로 BSS(Block Started by Symbol) 영역과 데이터 영역으로 나눌 수 있다
  - BSS 영역: 초기화하지 않은 변수를 저장  
  - 데이터 영역: 초기화된 변수를 저장  
  실행 도중 변수 값이 변경될 수 있으므로 Read-Write로 저장됨

- **스택(Stack) 영역**  
  지역 변수, 함수의 매개변수, 반환되는 주소 값 등이 저장되는 영
  함수의 호출과 함께 할당되며 함수의 호출이 완료되면 소멸함

- **힙(Heap) 영역**  
  사용자에 의해 동적 메모리 할당이 일어나는 영역
  생성자, 인스턴스와 같은 동적으로 할당되는 데이터들을 저장하는 공간

---

## 스레드 (Thread)

스레드는 프로세스 내에서 실행되는 작은 실행 단위이며 같은 프로세스 내에서 메모리 공간을 공유하며 실행됨

### 프로세스와 스레드의 차이

- **메모리 공유**  
  프로세스는 독립된 메모리 공간을 가지고 스레드는 같은 프로세스 내에서 메모리 공간을 공유함

- **자원 할당**  
  프로세스는 운영체제로부터 자원을 할당받고 스레드는 프로세스가 할당받은 자원을 공유하여 사용

---

### 멀티 프로세스와 멀티 스레드

- **멀티 프로세스**  
  하나의 애플리케이션을 여러 개의 프로세스로 구성하여 각 프로세스가 하나의 작업을 처리하도록 하는 방식 
  - 메모리 사용량이 많음  
  - 구현이 간단하고 안정성이 높음  

- **멀티 스레드**  
  한 프로세스 안에서 여러 개의 스레드를 동시에 실행하여 작업을 처리하는 방식
  - 자원 공유가 용이  
  - 응답성이 좋음  
  - 구현 및 디버깅이 어려울 수 있음  
  - 안정성에 문제가 발생할 가능성 있음

# MultipartFile 방식 vs Presigned URL 방식

## 1. MultipartFile 방식
- **설명**: 
  파일을 클라이언트에서 서버로 업로드한 뒤, 서버에서 S3로 업로드하는 방식

## 2. Presigned URL 방식
- **설명**: 
  클라이언트가 S3에 파일을 직접 업로드하는 방식

---

## 비교표

| 항목                  | MultipartFile 방식                                                                 | Presigned URL 방식                                                                          |
|-----------------------|-----------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| **동작 방식**         | 파일을 서버에 업로드 → 서버에서 S3로 저장                                          | 클라이언트가 Presigned URL을 통해 S3에 직접 업로드                                          |
| **서버 부하**         | 서버가 파일을 처리해야 하므로 서버 부하 증가                                        | 클라이언트가 직접 S3에 업로드하므로 서버 부하 감소                                          |
| **네트워크 비용**      | 서버가 클라이언트와 S3 간 네트워크 비용 모두 부담                                   | 클라이언트가 S3와 직접 통신하므로 서버의 네트워크 비용 감소                                 |
| **보안**              | 서버에서 파일 검증 후 S3에 저장 => 보안이 비교적 우수                                 | URL이 노출되면 파일 접근 가능성 있음 (해결방법: URL 만료 시간 설정)                     |
| **구현 복잡도**       | 서버에서 파일 검증 및 업로드 로직 구현 필요                                        | Presigned URL 생성 및 클라이언트에서의 업로드 로직 구현 필요                                |
| **실시간 처리**       | 파일 검증 및 처리 후 업로드 가능                                                   | 클라이언트가 바로 업로드 가능, 업로드 속도 증가                                             |
| **사용 사례**         | 파일 검증이 중요하거나, 서버에서 추가 처리(변환, 저장) 필요                        | 대용량 파일 업로드, 서버 부하를 줄여야 하는 경우                                            |

---

## 장단점

### MultipartFile 방식
- **장점**:
  - 서버에서 파일 검증, 변환 등 추가 처리가 가능
  - 파일 저장 경로와 관련된 제어가 서버에서 간단하게 이루어짐
  - 보안상 클라이언트에서 S3에 직접 접근하지 않음
- **단점**:
  - 서버 부하와 네트워크 비용이 증가
  - 대용량 파일 업로드 시 서버에 부담이 큼
  - 서버의 리소스를 많이 소모하므로 확장성이 떨어질 수 있음

### Presigned URL 방식
- **장점**:
  - 클라이언트가 S3에 직접 업로드하므로 서버 부하 감소
  - 대용량 파일 업로드에 적합
  - 서버와 클라이언트 간 통신 최소화로 네트워크 비용 절감
- **단점**:
  - Presigned URL의 보안 관리 필요(만료 시간 설정)
  - 서버에서 파일 검증을 할 수 없으므로 클라이언트에서 검증 로직 필요
  - 구현 복잡도가 약간 증가

</details>

<details>
<summary><h2>📖 2025-01-16 학습</h2></summary>

# Pagination(페이징)
- 많은 데이터나 콘텐츠를 한 번에 로드하지 않고, 사용자가 원하는 데이터를 적절한 크기로 나눠 보여주는 방법

## Pagination 종류

### **1. Offset 기반 Pagination**
#### **개요**
- 가장 일반적인 방식으로, 데이터베이스 쿼리에서 `LIMIT`와 `OFFSET`을 사용해 페이지를 나눔
- 클라이언트는 원하는 페이지 번호와 한 페이지당 데이터 개수를 서버에 요청

#### **특징**
- **장점**:
  - 구현이 간단하고 직관적임
  - 페이지 이동과 같은 일반적인 페이징에 적합
- **단점**:
  - 데이터가 많아지면 `OFFSET` 계산 비용이 증가
  - 데이터가 추가/삭제될 경우 페이징 순서가 어긋날 수 있음

#### **SQL 예제**
```sql
SELECT * 
FROM products 
ORDER BY id 
LIMIT 10 OFFSET 20;
```
- `OFFSET 20`은 3번째 페이지(한 페이지에 10개씩) 데이터를 가져옴

---

### **2. Cursor 기반 Pagination**
#### **개요**
- 특정 데이터를 기준으로 다음 데이터를 가져오는 방식
- 일반적으로 정렬된 필드를 기준으로 `WHERE` 조건을 이용해 다음 데이터 범위를 가져옴

#### **특징**
- **장점**:
  - 데이터가 많아도 성능이 우수
  - 데이터가 추가/삭제되어도 안정적인 결과를 보장
  - 대규모 실시간 데이터 처리에 적합
- **단점**:
  - 구현이 복잡하며, 특정 필드(예: ID나 타임스탬프) 기준이 필요
  - 무작위 페이지 이동이 어려움

#### **SQL 예제**
```sql
SELECT * 
FROM products 
WHERE id > 20 
ORDER BY id 
LIMIT 10;
```
- `id > 20`을 기준으로 다음 데이터를 가져옴

---

### **3. Keyset Pagination**
#### **개요**
- Cursor 기반 Pagination의 변형으로, 특정 정렬된 필드를 사용해 다음 데이터를 가져오는 방식
- 커서를 클라이언트에 저장해 요청 시 활용

#### **특징**
- **장점**:
  - 실시간 성능이 뛰어나며 데이터 양에 무관하게 일정한 성능을 유지
  - 스크롤 페이지에 적합
- **단점**:
  - 특정 필드에 종속적
  - 이전 페이지로 이동하는 경우 추가 구현이 필요

#### **예제**
- 클라이언트에서 `last_seen_id`와 같은 커서를 전달
```sql
SELECT * 
FROM products 
WHERE created_at > '2025-01-01 00:00:00' 
ORDER BY created_at 
LIMIT 10;
```

---

### **4. Infinite Scroll**
#### **개요**
- 사용자가 스크롤을 내릴 때마다 추가 데이터를 비동기적으로 로드하는 방식
- 트위터나 인스타그램 같은 소셜 네트워크에서 많이 사용

#### **특징**
- **장점**:
  - 사용자 경험(UX) 개선
  - 한 번에 많은 데이터를 보여주지 않아 로딩 시간 단축
- **단점**:
  - 구현이 복잡
  - 특정 데이터를 빠르게 찾기 어려움
  - SEO에 불리할 수 있음

#### **구현 방법**
- 클라이언트가 마지막 데이터 ID를 서버에 전달해 추가 데이터를 요청

---

### **5. Hybrid Pagination**
#### **개요**
- Offset 기반 Pagination과 Infinite Scroll의 혼합 방식
- 페이지 이동과 무한 스크롤을 병합하여 UX와 성능을 모두 고려

#### **특징**
- **장점**:
  - UX와 SEO 균형 유지
  - 필요한 경우 정적 페이지로 전환 가능
- **단점**:
  - 구현과 설계가 복잡

---

### **비교 요약**

| **방법**            | **장점**                                | **단점**                           | **적합한 경우**                          |
|---------------------|----------------------------------------|------------------------------------|-----------------------------------------|
| Offset 기반         | 간단하고 범용적                        | 대규모 데이터에서 성능 저하           | 페이지 기반 UI, 정적 데이터             |
| Cursor 기반         | 성능 우수, 안정적                      | 구현 복잡                           | 실시간 데이터 처리, 무한 스크롤         |
| Keyset 기반         | 안정적, 스크롤 페이지에 적합            | 특정 필드 종속, 이전 페이지 이동 어려움 | 대규모 데이터, 실시간 데이터            |
| Infinite Scroll     | UX 개선                               | SEO 문제, 데이터 탐색 어려움         | SNS, 실시간 콘텐츠                     |
| Hybrid Pagination   | UX와 SEO 균형                         | 구현 복잡                           | 다양한 사용자 요구 충족, 복합적인 UI 설계 |
---
</details>

<details>
<summary><h2>📖 2025-01-17 학습</h2></summary>

# OAuth(Open Authorization)

- 사용자가 비밀번호를 공유하지 않고 제 3의 application 또는 웹 사이트가 자신의 정보에 접근할 수 있도록 허용하는 인증 프로토콜
- 인증(Authentication)과 권한(Authorization)의 기능을 지원

## OAuth 주요 개념

1. Resource Owner
    - 사용자로 자신의 자원에 접근 권한을 가지고 있음
2. Client
    - 사용자의 자원에 접근하고자 하는 제 3자 application
    - ex) 타 서비스의 소셜 로그인이나 데이터를 사용하는 앱
3. Authorization Server(인증 서버)
    - 자원 소유자에게 인증을 받고 접근 토큰(Access Token)을 발급하는 서버
    - google, kakao, github 등 서비스의 인증 서버
4. Resource Server
    - 사용자 자원이 저장된 서버
    - 접근 토큰을 확인하고 요청을 처리
5. Access Token
    - client가 자원에 접근할 수 있는 권한을 부여받는 증명서
    - 토큰을 사용해 자원 서버에 요청을 보낼 수 있음

## OAuth 작동 방식

1. 사용자가 클라이언트를 통해 인증 요청
    - 사용자는 application(클라이언트)에 로그인하거나 인증 권한을 부여
    - 클라이언트는 인증 서버로 사용자 인증 요청을 전송
2. 사용자가 인증 서버에 로그인
    - 사용자가 인증 서버에서 자신의 자격 증명(아이디, 비밀번호 등)을 입력해 인증
3. 인증 코드 발급
    - 인증 서버는 사용자 인증이 성공하면 클라이언트에게 인증 코드 전달
4. 클라이언트가 인증 코드를 사용해 Access Token 요청
5. Access Token 발급
6. 클라이언트가 지원 서버에 요청
    - 발급받은 Access Token을 사용해 자원 서버에 데이터 요청
7. 자원 서버에서 Access Token 유효성 체크하고 데이터 제공
</details>

<details>
<summary><h2>📖 2025-01-18 학습</h2></summary>

# JWT(JSON Web Token)

- JSON 형식으로 정보를 안전하게 전송하기 위한 토큰 기반 인증 기술
- 인증과 권한 부여에 사용
- 서버와 클라이언트 간의 신뢰성 있는 데이터 교환을 목적으로 설계됨

## JWT 주요 구성요소

- 형태 : [Header].[Payload].[Signature]

### 1. Header

- JWT의 메타데이터를 포함
    - alg: 서명에 사용된 알고리즘(HS256, RS256 등)
    - typ: 토큰 타입
    
    ```json
    {
      "alg": "HS256",
      "typ": "JWT"
    }
    ```
    

### 2. Payload

- 토큰에 포함된 Claim 데이터를 저장하는 부분
- Claim: 사용자 정보나 토큰에 담을 기타 데이터를 표현, Base64Url로 인코딩
- Claim 유형
    1. 등록된(Registered) 클레임: 표준 클레임 (ex: iss, exp, sub, aud 등)
    2. 공개(Public) 클레임: 사용자 정의 데이터
    3. 비공개(Private) 클레임: 서버 간 공유를 위해 설정된 데이터
    
    ```json
    {
      "sub": "1234567890",
      "name": "John Doe",
      "admin": true,
      "iat": 1516239022
    }
    ```
    

### 3. Signature

- 토큰 위변조 방지를 위한 서명(Signature)
- 서명은 Header와 Payload를 합친 후, 비밀키와 함께 암호화하여 생성
    
    ```
    HMACSHA256(
      base64UrlEncode(header) + "." + base64UrlEncode(payload),
      secret
    )
    ```
    

## **JWT의 장점**

1. **무상태성 (Stateless)**
    - 서버에 사용자 상태(Session)를 저장하지 않아도 됨
    - JWT 자체에 모든 정보가 담겨 있기 때문에 서버 확장이 용이
2. **효율성**
    - 인증 정보와 추가 데이터를 한 번의 요청으로 전달 가능
    - Header, Payload, Signature로 구성되어 비교적 가벼움
3. **보안성**
    - 서명을 통해 데이터 위변조를 방지
    - 비공개 데이터를 공유하지 않고도 인증 가능

## **JWT의 단점**

1. **토큰 크기**
    - 클라이언트가 요청마다 토큰을 전달해야 하므로 토큰이 클수록 네트워크 사용량이 증가
2. **비가역성**
    - 발급 이후 수정할 수 없음
3. **노출 위험**
    - 노출되면 탈취된 토큰으로 인증이 가능
        - 해결법: HTTPS를 사용

## **JWT의 보안 강화 방법**

1. **HTTPS 사용**
    - 토큰 전송 과정에서 데이터 탈취를 방지
2. **짧은 만료 시간 설정**
    - 토큰이 오래 사용되지 않도록 제한
3. **토큰 갱신**
    - Refresh Token을 사용하여 만료된 토큰을 갱신
4. **서명 알고리즘 선택**
    - HMAC(Symmetric Key) 또는 RSA(Asymmetric Key) 사용
5. **IP 및 User-Agent 검증**
    - 요청 시 추가적인 검증을 통해 보안 강화

## JWT 토큰의 보안 문제와 유효 기간 설정의 딜레마

### 문제점

- JWT 토큰은 사용자 인증 정보를 담고 있어 탈취될 경우 악용될 수 있음
- 이를 방지하기 위해 토큰의 유효 기간을 설정
- 유효 기간이 짧으면 사용자가 자주 로그인을 해야 하는 불편함이 있고 길면 보안 위험이 증가

### 해결방안

- Access Token과 Refresh Token 두 가지 토큰을 사용
    - **Access Token**
        - 짧은 유효 기간
        - API 통신 시 사용
    - **Refresh Token**
        - 긴 유효 기간
        - Access Token이 만료되었을 때 새로운 Access Token을 발급받는 데 사용

### 두 토큰의 사용 흐름

1. 로그인 인증에 성공한 클라이언트는 `Refresh Token`과 `Access Token`  서버로부터 받음
2. 클라이언트는 `Refresh Token`과 `Access Token`을 local storage에 저장
3. 클라이언트는 **헤더**에 Access Token을 넣고 API 통신
4. `Access Token`의 **유효기간이 만료**
    - Access Token은 이제 유효하지 않으므로 **권한이 없는 사용자**가 됨
    - 클라이언트로부터 유효기간이 지난 Access Token을 받은 서버는 401에러 코드로 응답
    - `401`를 통해 클라이언트는 `invalid_token` 즉, 유효기간이 만료되었음을 알 수 있음
5. **헤더**에 Access Token 대신 `Refresh Token`을 넣어 **API를 재요청**
6. Refresh Token으로 사용자의 권한을 확인한 서버는 **응답쿼리 헤더**에 **새로운 Access Token**을 넣어 응답
7. 만약 `Refresh Token`도 **만료**되었다면 서버는 동일하게 **401 error code**를 보내고 클라이언트는 **재로그인**할 수 있게 페이지 이동

### **Refresh Token의 보안 고려사항**

- Refresh Token은 통신 빈도가 적지만 탈취 위험이 존재
- 이를 방지하기 위해 **Refresh Token Rotation** 기법이 사용됨

**Refresh Token Rotation** 이란?

- 클라이언트가 Access Token을 재요청할 때마다 새로운 Refresh Token을 발급받는 방식
- Refresh Token Rotation을 통해 탈취된 Refresh Token의 유효성을 최소화할 수 있음

[🧐 Access Token과 Refresh Token이란 무엇이고 왜 필요할까?](https://velog.io/@chuu1019/Access-Token%EA%B3%BC-Refresh-Token%EC%9D%B4%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B4%EA%B3%A0-%EC%99%9C-%ED%95%84%EC%9A%94%ED%95%A0%EA%B9%8C)

[[JS] 📚 LocalStorage / SessionStorage (vs 쿠키와 비교)](https://inpa.tistory.com/entry/JS-%F0%9F%93%9A-localStorage-sessionStorage)
</details>

<details>
<summary><h2>📖 2025-01-20 학습</h2></summary>

# SOLID Principles

- SOLID는 다섯 가지 핵심 원칙
- 소프트웨어 설계 시 유지보수성과 확장성을 높이기 위해 중요한 기준

## 1. SRP (Single Responsibility Principle) - **단일 책임 원칙**

- 클래스는 하나의 책임만 가져야 합니다.
- **설명**: 각 클래스는 한 가지 기능만 담당, 이 책임은 변경의 이유가 되어야 함
- **예시**
    
    ```java
    class UserService {
        void registerUser(User user) {
            // 사용자 등록 로직
        }
    
        void sendWelcomeEmail(User user) {
            // 환영 이메일 발송 로직
        }
    }
    ```
    
    - **개선**: 이메일 관련 로직은 별도의 클래스로 분리
        
        ```java
        class UserService {
            void registerUser(User user) {
                // 사용자 등록 로직
            }
        }
        
        class EmailService {
            void sendWelcomeEmail(User user) {
                // 이메일 발송 로직
            }
        }
        ```
        

## 2. OCP (Open/Closed Principle) - **개방-폐쇄 원칙**

- 확장에는 열려 있고, 변경에는 닫혀 있어야 함
- **설명**: 기존 코드를 수정하지 않고 기능을 확장할 수 있어야 함
- **예시**
    
    ```java
    class Shape {
        void draw() {
            // 기본 그리기 로직
        }
    }
    
    class Circle extends Shape {
        void draw() {
            // 원 그리기 로직
        }
    }
    ```
    

## 3. LSP (Liskov Substitution Principle) - **리스코프 치환 원칙**

- 서브 타입은 언제나 기반 타입으로 교체할 수 있어야 함
- **설명**: 부모 클래스 타입의 객체를 자식 클래스 타입으로 대체해도 프로그램이 정상적으로 동작해야 함
- **예시**
    
    ```java
    class Bird {
        void fly() {
            // 날기 기능
        }
    }
    
    class Penguin extends Bird {
        void fly() {
            throw new UnsupportedOperationException("펭귄은 날 수 없습니다.");
        }
    }
    
    ```
    
    - **개선**: 펭귄은 `Bird`를 상속받지 않고 별도의 인터페이스로 분리해야 함

## 4. ISP (Interface Segregation Principle) - **인터페이스 분리 원칙**

- 클라이언트는 자신이 사용하지 않는 메서드에 의존하지 않아야 함
- **설명**: 인터페이스는 구체적이고 작은 단위로 나누어야 함
- **예시**
    
    ```java
    interface Animal {
        void eat();
        void fly();
    }
    
    class Dog implements Animal {
        public void eat() {
            // 먹기 기능
        }
        public void fly() {
            throw new UnsupportedOperationException("강아지는 날 수 없습니다.");
        }
    }
    ```
    
    - **개선**: 인터페이스를 분리
    
    ```java
    interface Eater {
        void eat();
    }
    
    interface Flyer {
        void fly();
    }
    
    class Dog implements Eater {
        public void eat() {
            // 먹기 기능
        }
    }
    ```
    

## 5. DIP (Dependency Inversion Principle) - **의존성 역전 원칙**

- 고수준 모듈은 저수준 모듈에 의존해서는 안 됨, 둘 다 추상화에 의존해야 함
- **설명**: 구체 클래스가 아닌 인터페이스에 의존해야 함
- **예시**
    
    ```java
    class Keyboard {}
    
    class Computer {
        private Keyboard keyboard;
    
        Computer() {
            this.keyboard = new Keyboard();
        }
    }
    ```
    
    - **개선**: 의존성을 인터페이스로 역전
    
    ```java
    interface InputDevice {}
    
    class Keyboard implements InputDevice {}
    
    class Computer {
        private InputDevice inputDevice;
    
        Computer(InputDevice inputDevice) {
            this.inputDevice = inputDevice;
        }
    }
    
    ```
    

---

**참고 자료**

- [SOLID Principles - Wikipedia](https://en.wikipedia.org/wiki/SOLID)
- [Spring Documentation](https://spring.io/)
</details>

<details>
<summary><h2>📖 2025-01-21 학습</h2></summary>

## 1. **ID/Password**

### 설명

- 가장 기본적인 인증 방식
- 사용자가 ID와 비밀번호를 입력하여 서버에 인증 요청을 보냄
- 서버는 비밀번호를 해시(Hash)로 저장하며 사용자가 입력한 비밀번호를 해시 후 비교하여 인증

### 특징

- **장점**
    - 구현이 간단하고 널리 사용됨
    - 추가 소프트웨어나 장치 없이 사용 가능
- **단점**
    - 비밀번호 탈취 시 보안에 치명적
    - 강력한 비밀번호 정책 필요
    - 사용자마다 여러 서비스에 동일 비밀번호를 사용하는 경우 보안 위험 증가


## 2. **Cookie/Session**

### 설명

- 서버가 사용자 상태를 유지하기 위해 세션 ID를 생성하고 이를 클라이언트 쿠키에 저장
- 사용자는 요청마다 쿠키를 서버에 전송하며 서버는 세션 저장소에서 상태를 확인

### 특징

- **장점**
    - 서버 상태 관리가 쉬움
    - 다양한 환경(웹 브라우저, 앱)에서 적용 가능
- **단점**
    - 세션 저장소(RAM, Redis 등)에 부하 발생
    - MSA 환경에서는 세션 동기화가 필요
    - 쿠키 탈취(XSS, CSRF) 시 세션 하이재킹 가능


## 3. **Basic Auth**

### 설명

- HTTP 헤더에 `<ID>:<Password>`를 Base64로 인코딩하여 포함
- 요청마다 인증 정보를 포함하여 서버에 전송

### 특징

- **장점**
    - 간단한 구현과 HTTP 표준 지원
- **단점**
    - Base64 인코딩은 안전하지 않으며, HTTPS가 필수
    - 매 요청마다 인증 정보를 전송하므로 보안 위험 증가


## 4. **Web-Token**

### 설명

- 인증 정보를 암호화하거나 서명하여 토큰 형태로 전달
- 클라이언트가 서버로부터 발급받은 토큰을 사용하여 요청을 인증

### 특징

- **장점**
    - 상태를 서버가 유지하지 않아 확장성이 뛰어남
    - RESTful API에서 주로 사용
- **단점**
    - 토큰 탈취 시 일정 기간 악용 가능
    - 토큰 만료 및 갱신 관리 필요


## 5. **JWT (JSON Web Token)**

### 설명

- Web-Token의 한 형태
- JSON 형식의 데이터(헤더, 페이로드, 서명)로 구성된 인증 방식
- 클라이언트가 서버로부터 JWT를 발급받아 요청 시 `Authorization` 헤더에 포함

### 특징

- **장점**:
    - 서버 상태 유지가 필요 없으며 확장성 뛰어남
    - 데이터(페이로드)를 포함할 수 있어 추가 요청이 감소
- **단점**:
    - 토큰 크기가 커질 수 있음
    - 서명 검증만 가능하며, 탈취 시 만료 시간까지 악용 가능


## 6. **OAuth (Open Authorization)**

### 설명

- 제3자 인증 방식을 통해 사용자 자원을 안전하게 접근하는 프로토콜
- 사용자는 서비스 제공자(예: Google, Facebook)를 통해 인증받고 서비스 제공자는 클라이언트에 토큰을 발급

### 특징

- **장점**
    - 사용자가 비밀번호를 공유하지 않고도 인증 가능
    - 권한 범위를 세분화할 수 있음
- **단점**
    - 구현 및 설정이 복잡
    - 인증 제공자의 가용성에 의존


## 7. **SAML (Security Assertion Markup Language)**

### 설명

- XML 기반의 인증/권한 부여 표준으로, SSO(Single Sign-On)에 주로 사용
- ID 제공자(IdP)와 서비스 제공자(SP)가 SAML 어설션을 통해 사용자 인증

### 특징

- **장점**
    - 조직 내 SSO 환경에서 주로 사용
    - 높은 보안 수준 제공
- **단점**
    - 복잡한 설정 및 초기 구현 비용
</details>

<details>
<summary><h2>📖 2025-01-22 학습</h2></summary>

# CORS (Cross-Origin Resource Sharing)

- **교차 출처 리소스 공유**를 위한 프로토콜로, 2009년 HTML5 표준으로 채택됨
- **SOP**(Same Origin Policy)에 의해 제한된 교차 출처 리소스 요청을 허용하는 방법
- 서버에서 **CORS 헤더**를 설정하여 다른 출처에서의 리소스 접근을 제어 가능


# SOP (Same Origin Policy)

- **동일 출처 정책**으로 동일한 출처의 리소스만 접근을 허용하는 보안 정책
- **동일 출처**는 도메인, 프로토콜, 포트 번호가 모두 일치해야 함
    - 예: `https://www.naver.com:443`
    - 프로토콜//www.도메인.com:포트번호

### SOP가 없는 경우 발생 가능한 문제

- 세션 ID 등 민감한 정보가 탈취되어 **XSS**, **CSRF** 같은 공격에 악용될 수 있음
- SOP는 교차 출처 리소스 접근을 제한하여 보안 위협을 완화함


# CORS 프로토콜의 작동 원리

1. 서버가 응답에 **CORS 관련 헤더**를 설정
    - 허용할 도메인, HTTP 메서드, 요청 헤더 종류를 지정
2. 브라우저가 요청을 보내기 전 CORS 헤더 정보와 비교
    - 조건이 맞지 않으면 **CORS 에러** 발생
3. 요청이 보안적으로 민감하지 않으면(단순 요청 시) 바로 처리
4. 보안적으로 민감한 요청은 **Preflight 요청**을 통해 허가 여부 확인 후 처리


# Preflight 요청

- **보안적으로 민감한 요청**에 대해 사전 확인을 위한 요청
- 브라우저가 자동으로 실행하며, **OPTIONS 메서드** 사용
- 서버의 **CORS 설정**(도메인, 메서드, 헤더 등)을 확인
- 허용되지 않는 요청은 처리하지 않아 서버 부하를 줄임


# Preflight 요청의 조건

- 모든 CORS 요청에 Preflight 요청이 발생하지는 않음
    1. **단순 요청**인 경우 생략.
    2. 이전 Preflight 요청의 응답이 **캐싱**되어 있는 경우 생략
        - 캐싱은 `Access-Control-Max-Age` 헤더로 설정 가능


# 단순 요청 (Simple Request)

- **Preflight 요청 없이** 바로 처리 가능한 요청
- 다음 조건을 모두 만족해야 함
    1. HTTP 메서드가 **GET**, **HEAD**, **POST** 중 하나
    2. 요청 헤더가 CORS에서 허용된 값(`Content-Type`, `Accept`, 등)만 포함

### 단순 요청의 예

- JSON 데이터를 포함하지 않은 기본적인 GET 요청
- HTML 폼 데이터를 전송하는 POST 요청

[웹 개발자 면접 단골 질문 1 | CORS와 Preflight의 개념](https://www.youtube.com/watch?v=BQykNALA2WA&t=88s)
</details>

<details>
<summary><h2>📖 2025-01-23 학습</h2></summary>

# DTO vs Entity, 불변 DTO, Jackson 매핑 방식

## 1. Entity와 DTO의 차이

- **Entity**
    - DB 테이블과 직접적으로 매핑되는 도메인 모델 객체
    - JPA 환경에서 `@Entity`로 선언
    - DB 스키마와 일대일 대응하며, 비즈니스 로직을 포함하기도 함
        - 비즈니스 로직이 어떤게 들어갈지는 추후 공부
- **DTO(Data Transfer Object)**
    - Controller ↔ Service ↔ View(또는 Frontend) 계층 간 **데이터 교환**에 특화된 객체
    - 필요에 따라 Entity와 분리된 형태(필드 추가/삭제 가능)로 설계
    - **외부 request/response,**  **계층 간 데이터 이동**에 사용

## 2. DTO의 불변(Immutable) 설계와 생성자 주입

- **불변 객체(Immutable Object)**
    - 한 번 생성되면 내부 값이 변경되지 않음
    - 동시성(Concurrency) 문제 최소화, 예측 가능한 코드 작성
    - DTO가 외부에서 받은 값이 중간에 바뀌지 않아야 하는 경우 특히 유용
- **생성자 주입 vs Setter 주입**
    - setter가 존재하면 생성 후에도 값이 바뀔 수 있는 여지가 생김
    - 객체 생성 시 모든 필드를 주입하고 이후 수정 불가하도록 하는 방식을 선호
    - example
        
        ```java
        public class UserDTO {
            private final String name;
            private final int age;
        
            public UserDTO(String name, int age) {
                this.name = name;
                this.age = age;
            }
        
            // Getter만 존재, Setter는 없음
        }
        
        ```
        

## 3. @RequestBody와 JSON 매핑: Jackson의 동작 원리

- **요청 흐름(CSR, JSON)**
    1. 클라이언트(프론트엔드) → 서버: JSON 형태로 HTTP 요청 바디 전송
        
        ```json
        {
          "name": "홍길동",
          "age": 20
        }
        
        ```
        
    2. 서버(스프링): `@RequestBody`를 통해 DTO 매핑
        
        ```java
        @PostMapping("/user")
        public String createUser(@RequestBody UserDTO userDTO) {
            // userDTO: name=홍길동, age=20
            return "Created user: " + userDTO.getName();
        }
        
        ```
        
- **Jackson 매핑 과정**
    - 스프링 MVC의 HttpMessageConverter가 요청 바디(JSON)를 읽어 **Jackson 라이브러리**를 통해 DTO 객체로 변환
    - **기본 방식**: 기본 생성자 + Setter/필드 접근
    - **다른 방식**: 특정 생성자(전 필드를 인자로 받는) 호출
        - @JsonCreator와 @JsonProperty를 사용하면 Jackson이 필드마다 리플렉션으로 주입하지 않고 **생성자를 통해** 객체를 생성
        - 불변 DTO에 적합

## 4. 리플렉션 vs 생성자 호출

- Jackson이 객체를 생성할 때
    - (1) **기본 생성자**를 사용해 객체 생성 → setter나 **필드**를 리플렉션으로 매핑
    - (2) **특정 생성자**(@JsonCreator + @JsonProperty)를 통해 필요한 값을 **생성자 파라미터**로 넘겨 객체를 한 번에 생성
    - (2) 방식을 사용하면 필드를 일일이 setAccessible(true)로 열어 값 대입하는 리플렉션 비용이 줄어듦
    - 다만 Jackson이 "이 생성자를 써야 해!"라고 판단하기 위해 클래스 구조를 **인스펙션(리플렉션/바이트코드 분석)** 하는 과정은 여전히 있음
    - 하지만 매 요청마다 필드를 모두 리플렉션으로 세팅하는 것보다는 **훨씬 성능상 유리**

## 5. 실무 팁

1. **불변 DTO**
    - 모든 필드를 final로 두고 생성자를 통해 필드를 한 번에 초기화
    - @JsonCreator + @JsonProperty로 Jackson 매핑을 명시하면 생성자 기반 매핑 가능
2. **Lombok**
    - @AllArgsConstructor, @RequiredArgsConstructor + @JsonProperty 조합으로 편리하게 작성 가능
    - 빌더(Builder) 패턴 사용 시에는 추가 설정 필요
3. **Java Record** (JDK 16+)
    - DTO 용도로 **Record**를 사용하면 자동으로 생성자/Getter/Equals/HashCode가 생성
    - Jackson도 대부분 자동으로 인식 → 별도 설정 없이 불변 DTO 구축 가능

## 6. 정리

- DTO와 Entity를 분리해서 관리하면 **계층 간 의존성**을 명확히 분리하고 불필요한 필드 노출을 막을 수 있음
- DTO는 **불변**으로 구현하면 유지보수성과 안정성이 높아지며 Jackson 매핑 시 **생성자 기반 주입**을 활용하면 **성능**도 개선 가능
- @JsonCreator와 @JsonProperty를 통해 Jackson이 특정 생성자를 호출하도록 유도하면 필드 직접 주입 방식보다 **리플렉션 오버헤드**가 줄어듦

---

> Today I Learned
> 
> - DTO와 Entity의 개념 및 차이점
> - 불변 DTO(Immutable)와 생성자 주입(Setter 지양) 방식
> - Jackson의 JSON 매핑 원리 (기본 생성자 + 필드 주입 vs 생성자 주입)
> - 리플렉션 오버헤드를 줄이는 방법: `@JsonCreator`, `@JsonProperty`, Record
> - 실무에서 Lombok과 결합해 사용 가능

---

**참고**

- [Spring Documentation - Jackson HttpMessageConverter](https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#mvc-config-message-converters)
- [FasterXML Jackson 공식 문서](https://github.com/FasterXML/jackson-databind)
- [Baeldung - Jackson Annotations](https://www.baeldung.com/jackson-annotations)
</details>

<details>
<summary><h2>📖 2025-01- 학습</h2></summary>


</details>
