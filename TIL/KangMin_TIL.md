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
![graph](/uploads/6dcae4e081ca4c9696c4f4e3797d52a0/graph.png)

### KMeans 클러스터링
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
- **.cluster_centers_**는 각 클러스터의 중앙값 좌표

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

# 결과 이미지를 RGB로 변환
rgb_output_image = output_image.convert("RGB")

# 결과 이미지 저장 경로
output_image_path = "C:/Users/SSAFY/Desktop/dogdog_grid.jpg"
# 이미지 저장
rgb_output_image.save(output_image_path)
output_image_path
```
### 결과물
![dogdog_grid_reduced](/uploads/ebb375c9e6de538bd2defe7cfa17ac2c/dogdog_grid_reduced.jpg)
</div>
</details>



