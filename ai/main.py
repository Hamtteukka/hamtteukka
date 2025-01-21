from fastapi import FastAPI
from routers import dot_router

import uvicorn

# FastAPI 앱 초기화
app = FastAPI()

app.include_router(dot_router.router)

# ----- 메인 실행부 -----
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)