<details>
<summary>토글 접기/펼치기</summary>
<div markdown="1">

텍스트 , 이미지 등등 입력

</div>
</details>

## 강민 TIL

<details>
<summary>토글 접기/펼치기</summary>
<div markdown="1">


- Jira의 사용법에 대해 배웠다.
- 프롬프트 엔지니어링에 대해 더 깊이 파보는 중...

</div>
</details>


### 2025-01-14
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

### 2025-01-15
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


