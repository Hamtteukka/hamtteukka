from fastapi import FastAPI
from routers import dot_router, description_router
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# FastAPI 앱 초기화
app = FastAPI()


# CORS 미들웨어 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dot_router.router)
app.include_router(description_router.router)

# ----- 메인 실행부 -----
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)