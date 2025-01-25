## 강민 TIL

<details>
<summary>2025-01-13</summary>
<div markdown="1">

                        
- Jira의 사용법에 대해 배웠다.
- 프롬프트 엔지니어링에 대해 더 깊이 파보는 중...

</div>
</details>

<details>
<summary>2025-01-14</summary>
<div markdown="1">

#### python으로 영어 -> 한글 번역

```
pip install googletrans==4.0.0-rc1
```
```
from googletrans import Translator

def translate_text():
    translator = Translator()
    result = translator.translate("""text""", dest='en')
    print(result.text)

translate_text()
```

</div>
</details>

<details>
<summary>2025-01-15</summary>
<div markdown="1">

#### 이미지를 32bit로 생성하기
- 파이썬 이미지 처리 라이브러리 PIL 설치
```
pip install pillow
```
```
from PIL import Image, ImageDraw
import numpy as np

# 이미지 파일 경로
image_path = "이미지 파일 경로로" 

# 이미지 로드 및 32x32 픽셀화
grid_size = 32  # 격자 크기 (32x32 픽셀)
original_image = Image.open(image_path).convert("RGBA")
small_image = original_image.resize((grid_size, grid_size), Image.Resampling.NEAREST)

# 결과 이미지 크기 계산
cell_size = 70  # 각 격자의 크기 
output_size = grid_size * cell_size
output_image = Image.new("RGBA", (output_size, output_size), (255, 255, 255, 255))
draw = ImageDraw.Draw(output_image)

# 격자와 픽셀 색상 그리기
for y in range(grid_size):
    for x in range(grid_size):
        color = tuple(small_image.getpixel((x, y)))  # 픽셀 색상 추출 (RGBA)
        # 격자 셀에 색상 채우기
        draw.rectangle(
            [
                (x * cell_size, y * cell_size),
                ((x + 1) * cell_size - 1, (y + 1) * cell_size - 1),
            ],
            fill=color,
        )
        # 격자선 그리기
        draw.rectangle(
            [
                (x * cell_size, y * cell_size),
                ((x + 1) * cell_size - 1, (y + 1) * cell_size - 1),
            ],
            outline=(200, 200, 200, 255),  # 회색 격자선
        )

# 결과 이미지를 RGB로 변환
rgb_output_image = output_image.convert("RGB")

# 결과 이미지 저장 경로
output_image_path = "결과 이미지 경로로"
# 이미지 저장
rgb_output_image.save(output_image_path)
output_image_path
```

#### 이미지 배경 제거
- 이미지 배경 제거를 위한 rembg 라이브러리 설치
```
pip install rembg
```
```
from rembg import remove
from PIL import Image

input = Image.open("이미지 경로") # load image
output = remove(input) # remove background
output.save("결과 이미지 경로") # save image
```
- 코드 실행 시 이미지 배경 제거와 같은 작업에 사용되는 딥러닝 기반 세그멘테이션 모델인 u2net이 자동 다운로드


- 배경 있는 이미지 배경 제거 후 32bit로 생성하기
```
from PIL import Image, ImageDraw
from rembg import remove
import numpy as np

# 이미지 파일 경로
image_path = "이미지 파일 경로로" 

# 이미지 로드 및 32x32 픽셀화
grid_size = 32 
input = Image.open(image_path) 
output = remove(input)
original_image = output.convert("RGBA")
small_image = original_image.resize((grid_size, grid_size), Image.Resampling.NEAREST)

# 결과 이미지 크기 계산
cell_size = 70 
output_size = grid_size * cell_size
output_image = Image.new("RGBA", (output_size, output_size), (255, 255, 255, 255))
draw = ImageDraw.Draw(output_image)

# 격자와 픽셀 색상 그리기
for y in range(grid_size):
    for x in range(grid_size):
        color = tuple(small_image.getpixel((x, y)))  # 픽셀 색상 추출 (RGBA)
        # 격자 셀에 색상 채우기
        draw.rectangle(
            [
                (x * cell_size, y * cell_size),
                ((x + 1) * cell_size - 1, (y + 1) * cell_size - 1),
            ],
            fill=color,
        )
        # 격자선 그리기
        draw.rectangle(
            [
                (x * cell_size, y * cell_size),
                ((x + 1) * cell_size - 1, (y + 1) * cell_size - 1),
            ],
            outline=(200, 200, 200, 255),  # 회색 격자선
        )

# 결과 이미지를 RGB로 변환
rgb_output_image = output_image.convert("RGB")

# 결과 이미지 저장 경로
output_image_path = "결과 이미지 경로로"
# 이미지 저장
rgb_output_image.save(output_image_path)
output_image_path
```

</div>
</details>

<details>
<summary>2025-01-16</summary>
<div markdown="1">

## RGB vs RGBA

### RGB

- Red Green Blue의 약어
- (255,255,255) 이런 형식으로 나타남
### RGBA

- RGB에 투명도 개념인 alpha를 추가한 것
- (255,0,0,0.5) 이면 투명도가 0.5인 빨간색

## 도트 도안 비슷한 색상 합쳐서 색상 수 줄이기 (KMeans 클러스터링 활용)

### 사용이미지지 
![dogdog](/uploads/cdf51fed75efd41543a6c4a4775fe335/dogdog.jpg)

### image to 2D Array
```
from PIL import Image, ImageDraw
from rembg import remove
import numpy as np
from sklearn.cluster import KMeans

# 이미지 파일 경로
image_path = "C:/Users/SSAFY/Desktop/dogdog.jpg"

# 이미지 로드 및 32x32 픽셀화
grid_size = 32 
input = Image.open(image_path) 
output = remove(input)
original_image = output.convert("RGBA")
small_image = original_image.resize((grid_size, grid_size), Image.Resampling.NEAREST)
pixels = np.array(small_image) # -> (높이, 너비, 채널수(RGBA))의 3차원 배열
original_shape = pixels.shape
# 픽셀을 2D 배열로 재구성
pixels_2d = pixels.reshape(-1, 4) # -> RGBA이기 떄문에 4로 바꿔야함 왜냐하면 RGBA는 4개의 숫자로 구성됨 / 만약 RGB면 3으로
```
#### -> 2차원 배열로 변경

### 컬러값만 뽑은 pixels_2d를 시각화
```
import matplotlib.pyplot as plt

# RGBA 2D 배열을 시각화하기 위해 RGB만 추출
rgb_pixels = pixels_2d[:, :3]

# RGB 값의 3D 공간 시각화
fig = plt.figure(figsize=(8, 8))
ax = fig.add_subplot(111, projection='3d')

# X, Y, Z 축에 RGB 값 배치
ax.scatter(rgb_pixels[:, 0], rgb_pixels[:, 1], rgb_pixels[:, 2], c=rgb_pixels / 255, s=10)

ax.set_xlabel('Red')
ax.set_ylabel('Green')
ax.set_zlabel('Blue')
ax.set_title('RGB Color Distribution')

plt.show()
```
![graph](/uploads/6dcae4e081ca4c9696c4f4e3797d52a0/graph.png){: width="300" height="300"}

### KMeans 클러스터링
- 클러스터의 개수를 미리 정하여 반복적으로 클러스터의 평균을 업데이트하며 가장 가까운 점들을 군집화하는 방법
- 색상에 KMeans 클러스터링을 도입하여 각 군집의 중심심 색상으로 변경하는 전략으로 다가감

```
# K-means 클러스터링

n_colors = 4 # 원하는 색상 수 4개

kmeans = KMeans(n_clusters=n_colors, random_state=42) # KMeans 모델 정의
labels = kmeans.fit_predict(pixels_2d) # 2D 배열을 예측

# 각 픽셀을 가장 가까운 중심점의 색상으로 대체
new_pixels = kmeans.cluster_centers_[labels]  #  .cluster_centers_는 각 클러스터의 중앙값 좌표 
    
# 이미지 형태로 다시 재구성
new_pixels = new_pixels.reshape(original_shape)

# 배열을 image로 변환
Image.fromarray(np.uint8(new_pixels))
```
- **.cluster_centers_** 는 각 클러스터의 중앙값 좌표

### 전체 코드
```
from PIL import Image, ImageDraw
from rembg import remove
import numpy as np
from sklearn.cluster import KMeans

# 이미지 파일 경로
image_path = "C:/Users/SSAFY/Desktop/dogdog.jpg"

def reduce_colors(image, n_colors): # 이미지, 원하는 색상의 수
    
    pixels = np.array(image)
    original_shape = pixels.shape
    
    # 3차원 pixel을 2차원으로 변경
    pixels_2d = pixels.reshape(-1, 4) # -> RGBA이기 떄문에 4로 바꿔야함 왜냐하면 RGBA는 4개의 숫자로 구성됨 / 만약 RGB면 3으로
    
    # KMeans 클러스터링
    kmeans = KMeans(n_clusters=n_colors, random_state=42)
    labels = kmeans.fit_predict(pixels_2d)
    
    # 각 픽셀을 가장 가까운 중심점의 색상으로 대체
    new_pixels = kmeans.cluster_centers_[labels]
    
    # 이미지 형태로 다시 재구성
    new_pixels = new_pixels.reshape(original_shape)
    
    # 배열을 image로 변환
    return Image.fromarray(np.uint8(new_pixels))

# 이미지 로드 및 32x32 픽셀화
grid_size = 32 
input = Image.open(image_path) 
output = remove(input)
original_image = output.convert("RGBA")
small_image = original_image.resize((grid_size, grid_size), Image.Resampling.NEAREST)

# 색상 수 줄이기
n_colors = 4  # 원하는 색상 수
reduced_image = reduce_colors(small_image, n_colors)

# 결과 이미지 크기 계산
cell_size = 70  # 각 격자의 크기 
output_size = grid_size * cell_size
output_image = Image.new("RGBA", (output_size, output_size), (255, 255, 255, 255))
draw = ImageDraw.Draw(output_image)

# 격자와 픽셀 색상 그리기
for y in range(grid_size):
    for x in range(grid_size):
        color = tuple(reduced_image.getpixel((x, y)))  # 픽셀 색상 추출 (RGBA)
        # 격자 셀에 색상 채우기
        draw.rectangle(
            [
                (x * cell_size, y * cell_size),
                ((x + 1) * cell_size - 1, (y + 1) * cell_size - 1),
            ],
            fill=color,
        )
        # 격자선 그리기
        draw.rectangle(
            [
                (x * cell_size, y * cell_size),
                ((x + 1) * cell_size - 1, (y + 1) * cell_size - 1),
            ],
            outline=(200, 200, 200, 255),  # 회색 격자선
        )


# 결과 이미지 저장 경로
output_image_path = "C:/Users/SSAFY/Desktop/dogdog_grid.png" # png로 저장해야 RGBA 형태로 저장 가능능
# 이미지 저장
output_image.save(output_image_path)
```
### 결과물
![dogdog_grid_reduced](/uploads/79fc81b49abc43fd5c5b850804299011/dogdog_grid_reduced.png){: width="300" height="300"}
</div>
</details>

<details>
<summary>2025-01-17</summary>
<div markdown="1">

## ngrok으로 로컬에서 서버 실행

- https://ngrok.com/ 로그인
- os에 맞는 installer 다운로드 후 실행
- config 설정

```
ngrok config add-authtoken 토큰
```

- FastAPI 실행
```
cd 프로젝트 경로 

uvicorn main:app --reload
```

- ngrok 실행

```
ngrok http --url=[할당받은 스태틱 도메인 이름] [실행 포트번호]
```                

</div>
</details>

<details>
<summary>2025-01-20</summary>
<div markdown="1">

## FastAPI
- python web framework
- API를 만들 수 있고, python 3.6 버전 이상에서 적용 가능함
- 인공지능 분야에서 널리 사용하고 있는 백엔드 프레임워크
- 설치

```
pip install fastapi
```

### FastAPI 특징
- API 문서 자동 생성 (Swagger -> localhost:8000/docs)
- 비동기 동작으로 빠른 성능 보장 (uvicorn 사용용)
- Pydantic을 사용한 Validation 체크

## uvicorn
- lightweight(매우 가벼운) ASGI 서버
- fastapi framework만으로는 웹 개발을 할 수 없고, ASGI와 호환되는 웹 서버가 필요함
- 비동기 방식이 가능한 python web server framework(Fastapi가 대표적)와 application 간의 표준 interface를 제공함
- 배포에 별도의 준비가 필요 없음
- 설치

```
pip install uvicorn
```

### FastAPI와 uvicorn 사용하는 간단한 예제 코드 (main.py)

```
from fastapi import FastAPI

app = FastAPI() # 인스턴스 생성

@app.get("/") # get method로 '/'에 해당하는  생성
def root():
    return {'Hello':'World!'} 
```

### 실행

```
uvicorn main:app --reload
```

localhost:8000에서 확인 가능

</div>
</details>

<details>
<summary>2025-01-21</summary>
<div markdown="1">

## Redis
### 특징
- **"Remote Dictionary Server"** 의 약자로, 오픈 소스 인메모리 데이터 구조 저장소
- 주로 캐싱, 세션 관리, 메시지 큐 등 다양한 용도로 사용
- 데이터베이스, 캐시, 메시지 브로커 기능을 지원하며, 키-값 저장소(Key-Value Store) 형태로 데이터를 저장
- 데이터를 메모리(RAM)에 저장하므로  빠른 속도를 자랑

### 데이터 백업 방식
#### RDB(Redis Database)
- 메모리에 있는 데이터 전체에서 스냅샷을 작성하고, 이를 디스크로 저장하는 방식

- 특정 시간마다 여러 개의 스냅샷을 생성하고, 데이터를 복원해야 한다면 스냅샷 파일을 그대로 로딩만 하면 됨

- 하지만, 스냅샷 이후 변경된 데이터는 복구할 수 없음 → 데이터 유실(loss)

#### AOF(Append Only File)
- 데이터가 변경되는 이벤트가 발생하면 이를 모두 로그에 저장하는 방식
- 데이터를 생성, 수정, 삭제하는 이벤트를 초 단위로 취합 및 로그 파일에 작성
- 모든 데이터의 변경 기록들을 보관하고 있으므로 최신 데이터 정보를 백업 가능
- RDB 방식에 비해 데이터 유실량이 적음(초 단위 데이터는 유실 가능)
- RDB 방식보다 로딩 속도가 느리고 와 파일 크기가 큰 것이 단점

#### 어떻게 사용해야하는가
- 일부 데이터 손실에 영향을 받지 않는 경우(캐시로만 사용할 때) => **RDB**
- 장애 상황 직전까지의 모든 데이터가 보장되어야 할 경우 => **AOF**
- 강력한 내구성이 필요한 경우 => **RDB + AOF**
- 레디스는 일반적으로 AOF와 RDB를 동시에 사용하여 데이터를 백업
</div>
</details>

<details>
<summary>2025-01-22</summary>
<div markdown="1">
<<<<<<< HEAD
=======

## Python Pydantic
### 설명
- Python에서 데이터 유효성 검증 및 설정 관리에 사용되는 라이브러리

### 특징
#### 타입 힌트 기반 모델링

- Pydantic은 Python의 타입 힌트를 사용해 데이터 모델을 정의하며, 정의된 타입에 따라 자동으로 데이터를 검증
- 예: int, str, List, Dict, datetime 등과 같은 기본 타입 및 복합 타입 지원

#### 자동 데이터 변환

- 입력된 데이터가 모델에 정의된 타입과 다를 경우 가능한 한 자동으로 변환
- 예를 들어, 문자열로 입력된 "123"은 정수 123으로 변환

#### 유효성 검증

- 필드별로 다양한 검증 조건을 설정
- 예: min_length, max_length, regex, ge(greater than or equal), le(less than or equal) 등.

#### JSON 및 Dict 변환

- Pydantic 모델은 JSON 및 Python dict로 쉽게 변환 가능
- 데이터 직렬화/역직렬화에 유용용

#### 데이터 계층화

- 중첩된 데이터 구조를 쉽게 표현 가능 / 복잡한 데이터 계층 구조를 다룸

### 프로젝트에서 어떻게 적용?

```
from pydantic import BaseModel

# ----- Pydantic 모델 -----
# 서술형 도안 인풋
class Description_Input(BaseModel):
    needle: str
    work: str  
    detail: str
```
서술형 도안의 인풋에 Pydantic 사용

</div>
</details>

>>>>>>> b79003b3ab030ab3b203f70bc377e9f2beddfeb0

## Python Pydantic
### 설명
- Python에서 데이터 유효성 검증 및 설정 관리에 사용되는 라이브러리

### 특징
#### 타입 힌트 기반 모델링

- Pydantic은 Python의 타입 힌트를 사용해 데이터 모델을 정의하며, 정의된 타입에 따라 자동으로 데이터를 검증
- 예: int, str, List, Dict, datetime 등과 같은 기본 타입 및 복합 타입 지원

#### 자동 데이터 변환

- 입력된 데이터가 모델에 정의된 타입과 다를 경우 가능한 한 자동으로 변환
- 예를 들어, 문자열로 입력된 "123"은 정수 123으로 변환

#### 유효성 검증

- 필드별로 다양한 검증 조건을 설정
- 예: min_length, max_length, regex, ge(greater than or equal), le(less than or equal) 등.

#### JSON 및 Dict 변환

- Pydantic 모델은 JSON 및 Python dict로 쉽게 변환 가능
- 데이터 직렬화/역직렬화에 유용용

#### 데이터 계층화

- 중첩된 데이터 구조를 쉽게 표현 가능 / 복잡한 데이터 계층 구조를 다룸

### 프로젝트에서 어떻게 적용?

```
from pydantic import BaseModel

# ----- Pydantic 모델 -----
# 서술형 도안 인풋
class Description_Input(BaseModel):
    needle: str
    work: str  
    detail: str
```
서술형 도안의 인풋에 Pydantic 사용

</div>
</details>

<details>
<summary>2025-01-23</summary>
<div markdown="1">

## WebClient
### WebClient 란?

- WebClient는 RestTemplate를 대체하는 HTTP 클라이언트
- 기존의 동기 API를 제공할 뿐만 아니라, 논블로킹 및 비동기 접근 방식을 지원해서 효율적인 통신이 가능
- WebClient는 요청을 나타내고 전송하게 해주는 빌더 방식의 인터페이스를 사용하며, 외부 API로 요청을 할 때 리액티브 타입의 전송과 수신을 합니다. (Mono, Flux)

### 특징

#### 비동기 논블로킹 처리

- 요청과 응답을 논블로킹 방식으로 처리하여 고성능, 고효율 애플리케이션을 구축 가능능
- Reactor 프로젝트의 Mono와 Flux를 기반으로 작동

#### 동기/비동기 지원

- 기본적으로 비동기로 작동하지만, 동기식으로도 호출 결과를 처리 가능능

#### 유연한 요청 설정:

- HTTP 메서드(GET, POST, PUT, DELETE 등)를 유연하게 설정 가능 / 다양한 헤더, URL 파라미터 등을 간편하게 설정 가능

#### 다양한 인코딩 및 디코딩

- JSON, XML 등 다양한 데이터 포맷을 지원 / 커스텀 인코더/디코더를 추가로 정의 가능

#### 타임아웃 및 재시도

- 요청 타임아웃 및 실패 시 재시도 로직을 쉽게 설정 가능

### 의존성 추가
```
// gradle
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-webflux'
}

```

### 프로젝트에서 어떻게 사용?

- webClient 설정
```
private final WebClient webClient;

    public ImageService() {
        this.webClient = WebClient.builder()
                .baseUrl("http://localhost:8000")
                .codecs(configurer -> configurer
                        .defaultCodecs()
                        .maxInMemorySize(10 * 1024 * 1024))
                .build();
    }
```

- POST 요청 보내기
```
public Mono<DescriptionPatternResponseDto> generateDescription(DescriptionPatternRequestDto dto){
        return webClient.post()
                .uri("/v1/description/generate")
                .body(Mono.just(dto), DescriptionPatternRequestDto.class)
                .retrieve()
                .bodyToMono(DescriptionPatternResponseDto.class);
    }
```

</div>
</details>

<details>
<summary>2025-01-24</summary>
<div markdown="1">

                        
## DifferedResult
### 개념

- 요청-응답의 흐름을 비동기적으로 처리하기 위한 객체
- 동기 작업의 완료를 기다리는 대신 결과를 나중에 제공하는 데 사용

### 특징

#### 비동기 응답 처리

- 요청에 대한 응답을 즉시 반환하지 않고, 작업이 완료될 때까지 대기하거나 콜백을 통해 처리

#### 비동기 작업 상태 관리

- DeferredResult는 작업의 상태(예: 완료, 실패, 타임아웃)를 관리
- 상태 변화에 따라 콜백 함수나 핸들러를 트리거

#### 시간 초과 지원

- 지정된 시간이 초과되면 타임아웃 상태로 전환하며, 적절한 대체 응답을 제공

#### 쓰레드 효율성

요청 스레드를 차단하지 않고, 비동기적으로 작업이 완료될 때까지 다른 작업을 수행

### 프로젝트에서 적용
```
@PostMapping("/ai/description")
    @Operation(summary="서술형 도안 FastAPI에 요청해서 받아오기")
    public DeferredResult<DescriptionPatternCreateResponse> generateDescriptionPattern(@RequestBody DescriptionPatternCreateRequest request) {
        DeferredResult<DescriptionPatternCreateResponse> output = new DeferredResult<>(300000L); // 5분 타임아웃

        patternCreateService.createDescription(request)
                .subscribe(response -> output.setResult(response), // 성공 시 결과 반환
                        error -> output.setErrorResult(error)); // 실패 시 에러 반환

        return output;
    }
```
#### 사용한 이유
- FastAPI에서 서술형 도안을 받을 때 60 ~ 90 초 가량 시간이 소요됨 Mono 타입으로 받았을 시에는 타임아웃이 발생하여 503 Error가 발생하였음
- DefferedResult 타입을 사용함으로 타임 아웃 시간을 설정할 수 있어 요청에 대한 응답을 받을 수 있었음

</div>
</details>

