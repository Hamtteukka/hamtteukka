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
<summary><h2>📖 2025-01- 학습</h2></summary>


</details>
