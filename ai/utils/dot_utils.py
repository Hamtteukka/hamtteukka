import numpy as np
from sklearn.cluster import KMeans
from PIL import Image, ImageDraw
from rembg import remove
import io


# 색상 줄이기 함수
def reduce_colors(image, nColors):
    """
    이미지와 원하는 색상 수를 넣고 머신러닝의 KMeans 클러스터링을 활용하여 비슷한 색상을 하나로 묶어서 이미지 반환
    """
    pixels = np.array(image)
    original_shape = pixels.shape
    pixels_2d = pixels.reshape(-1, 4)
    kmeans = KMeans(n_clusters=nColors, random_state=42)
    labels = kmeans.fit_predict(pixels_2d)
    new_pixels = kmeans.cluster_centers_[labels]
    new_pixels = new_pixels.reshape(original_shape)
    return Image.fromarray(np.uint8(new_pixels))


# 도트 도안 만들기
def create_dot_pattern(image_data, height=32, width=32, nColors=5, background=True):
    """
    이미지, 가로 픽셀, 세로 픽셀, 원하는 색상 수, 배경 제거(True/False)를 입력받아 도트 도안 이미지를 반환
    """
    image = Image.open(io.BytesIO(image_data))
    if background:
        output = remove(image)
    else:
        output = image
    original_image = output.convert("RGBA")
    small_image = original_image.resize((width, height), Image.Resampling.NEAREST)
    reduced_image = reduce_colors(small_image, nColors)

    cell_size = 20
    output_width = width * cell_size
    output_height = height * cell_size
    output_image = Image.new("RGBA", (output_width, output_height), (255, 255, 255, 255))
    draw = ImageDraw.Draw(output_image)

    for y in range(height):
        for x in range(width):
            color = tuple(reduced_image.getpixel((x, y)))
            draw.rectangle(
                [(x * cell_size, y * cell_size),
                 ((x + 1) * cell_size - 1, (y + 1) * cell_size - 1)],
                fill=color
            )
            draw.rectangle(
                [(x * cell_size, y * cell_size),
                 ((x + 1) * cell_size - 1, (y + 1) * cell_size - 1)],
                outline=(200, 200, 200, 255)
            )

    img_byte_arr = io.BytesIO()
    output_image.save(img_byte_arr, format='PNG')
    return img_byte_arr.getvalue()