from fastapi import APIRouter, File, UploadFile, Form
from fastapi.responses import JSONResponse
import base64
from utils.dot_utils import create_dot_pattern

router = APIRouter()

@router.post("/v1/dot/generate")
async def convert_image(
    file: UploadFile = File(...),
    height: int = Form(),
    width: int = Form(),
    nColors: int = Form(),
    background: bool = Form()
):
    try:
        contents = await file.read()
        result_image = create_dot_pattern(contents, height, width, nColors, background)
        encoded_image = base64.b64encode(result_image).decode('utf-8')
        return JSONResponse(content={"dotImage": encoded_image})
    except Exception as e:
        return JSONResponse(
            status_code=400,
            content={"error": f"처리 중 오류가 발생했습니다: {str(e)}"}
        )
