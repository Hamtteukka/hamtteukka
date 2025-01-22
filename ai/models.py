from pydantic import BaseModel


# ----- Pydantic 모델 -----
# 서술형 도안 인풋
class Description_Input(BaseModel):
    needle: str
    work: str  
    detail: str