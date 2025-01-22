from models import Description_Input
from settings import *
import openai
from googletrans import Translator
import json
import random
import traceback
from urllib import request
from fastapi import HTTPException
import asyncio

# openAI로 서술형 도안 받아오는 함수
async def openai_text(input : Description_Input) -> str:
    client = openai.OpenAI(api_key = OPEN_AI_API_KEY)


    user_prompt = f"""- 바늘 : {input.needle}
- 작품 : {input.work}
- 상세설명 : {input.detail}
- 결과는 뜨개질 과정과 각 단위 작업을 단계별 자세하게 작성해주세요.
- 말투는 친절하지만 세세하게 설명해주세요
"""

    completion = client.chat.completions.create(
        model="gpt-4o", 
        messages=[
            {
                "role": "system", 
                "content": SYSTEM_PROMPT
            },
            {
                "role": "user", 
                "content": user_prompt
            }
        ],
        temperature=0.5
    )


    return completion.choices[0].message.content

# 한글 -> 영어로 번역하는 함수
async def translate_text(text: str) -> str:
    translator = Translator()
    result = await translator.translate(text, dest='en')
    return result.text

# workflow 파일 불러오는 함수
async def load_workflow_file(path: str) -> dict:
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)
    

# workflow의 prompt 수정하는 함수
async def modify_workflow(text: str, original_workflow: dict) -> dict:
    workflow = original_workflow.copy()
    workflow["6"]["inputs"]["text"] = text + " please give me a high-quality image"
    workflow["31"]["inputs"]["seed"] = random.randint(0, 2**32 - 1) # random 시드 생성
    return workflow

# comfyUI에 프롬프트 보내는 함수
async def queue_prompt(prompt_workflow: dict, ip: str) -> str:
    url = f"http://{ip}/prompt"
    data = json.dumps({"prompt": prompt_workflow}).encode("utf-8")
    req = request.Request(url, data=data, headers={"Content-Type": "application/json"})
    try:
        res = request.urlopen(req)
        if res.code != 200:
            raise HTTPException(status_code=500, detail=f"ComfyUI Error: {res.code} {res.reason}")
        response_data = json.loads(res.read().decode("utf-8"))
        prompt_id = response_data.get("prompt_id")
        if not prompt_id:
            raise HTTPException(status_code=500, detail="No prompt_id returned from ComfyUI")
        return prompt_id
    except HTTPException:
        raise
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Queue Prompt Error: {str(e)}")

# 진행 상황 체크하는 함수
async def check_progress(prompt_id: str, ip: str) -> dict:
    url = f"http://{ip}/history/{prompt_id}"
    while True:
        try:
            req = request.Request(url)
            res = request.urlopen(req)
            if res.code == 200:
                history = json.loads(res.read().decode("utf-8"))
                if prompt_id in history:
                    return history[prompt_id]
        except Exception as e:
            print(f"ComfyUI history endpoint error: {e}")
            await asyncio.sleep(5)
            continue
        await asyncio.sleep(1)

# 저장된 이미지 path 반환 함수
async def find_final_image_path(history: dict, output_dir: str) -> str:
    outputs = history.get("outputs", {})
    for node_id, node_output in outputs.items():
        if "images" in node_output:
            for image in node_output["images"]:
                filename = image.get("filename")
                if filename:
                    final_path = os.path.join(output_dir, filename)
                    return os.path.normpath(final_path)
    return ""
