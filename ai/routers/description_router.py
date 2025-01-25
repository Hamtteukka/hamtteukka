from fastapi import APIRouter, HTTPException
from models import Description_Input
from utils.description_utils import *
from settings import *
import base64
from fastapi.responses import JSONResponse
import traceback

router = APIRouter()

@router.post("/ai/description")
async def generate(input_data: Description_Input):
    try:
        original_workflow = await load_workflow_file(WORKFLOW_PATH)
        description_pattern = await openai_text(input_data)
        translated_text = await translate_text(description_pattern)
        modified_workflow = await modify_workflow(translated_text, original_workflow)
        prompt_id = await queue_prompt(modified_workflow, COMFYUI_IP)
        result_history = await check_progress(prompt_id, COMFYUI_IP)
        image_path = await find_final_image_path(result_history, OUTPUT_DIR)
        
        # 이미지가 없으면 에러 처리
        if not image_path or not os.path.exists(image_path):
            raise HTTPException(status_code=404, detail="Generated image not found")

        # 이미지 파일을 읽어서 Base64로 인코딩
        with open(image_path, "rb") as f:
            image_data = f.read()
        encoded_image = base64.b64encode(image_data).decode("utf-8")

        # 서술형 도안, Base64로 인코딩된 이미지 데이터 반환
        return JSONResponse(content={
            "description": description_pattern,
            "expectedImage": encoded_image
        })

    except HTTPException as e:
        raise e
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Generate Error: {str(e)}")
