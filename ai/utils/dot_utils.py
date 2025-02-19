import numpy as np
from sklearn.cluster import KMeans
from PIL import Image, ImageDraw, ImageFont
from rembg import remove
import io


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


def create_dot_pattern(image_data, height=32, width=32, nColors=5, background=True):
    """
    이미지, 가로 픽셀, 세로 픽셀, 원하는 색상 수, 배경 제거(True/False)를 입력받아 도트 도안 이미지를 반환
    """
    image = Image.open(io.BytesIO(image_data))
    processed_image = remove(image) if background else image
    original_image = processed_image.convert("RGBA")

    small_image = original_image.resize((width, height), Image.Resampling.NEAREST)
    reduced_image = reduce_colors(small_image, nColors)

    cell_size = 20
    margin = 50
    canvas_width = width * cell_size + margin * 2
    canvas_height = height * cell_size + margin * 2
    canvas = Image.new("RGBA", (canvas_width, canvas_height), (255, 255, 255, 255))
    draw = ImageDraw.Draw(canvas)

    for y in range(height):
        for x in range(width):
            top_left = (x * cell_size + margin, y * cell_size + margin)
            bottom_right = ((x + 1) * cell_size - 1 + margin, (y + 1) * cell_size - 1 + margin)
            cell_color = tuple(reduced_image.getpixel((x, y)))
            draw.rectangle([top_left, bottom_right], fill=cell_color, outline=(200, 200, 200, 255))

    font_size = 12
    font = ImageFont.load_default()

    max_number = ((height - 1) // 5) * 5
    for i in range(0, height, 5):
        display_number = max_number - i
        if display_number > 0:
            y_position = (height - (display_number // 5) * 5) * cell_size + margin
            text_y = y_position + cell_size / 2 - font_size / 2
            draw.text((margin - 35, text_y), str(display_number), fill=(0, 0, 0, 255), font=font)
            draw.text((canvas_width - margin + 20, text_y), str(display_number), fill=(0, 0, 0, 255), font=font)

    for y in range(height):
        marker = ">" if y % 2 == 0 else "<"
        text_y = y * cell_size + margin + cell_size / 2 - font_size / 2
        if y % 2 == 0:
            draw.text((margin - 15, text_y), marker, fill=(0, 0, 0, 255), font=font)
        else:
            draw.text((canvas_width - margin + 5, text_y), marker, fill=(0, 0, 0, 255), font=font)

    output_buffer = io.BytesIO()
    canvas.save(output_buffer, format="PNG")
    return output_buffer.getvalue()