## 강민 TIL
### 2025-01-13

- Jira의 사용법에 대해 배웠다.
- 프롬프트 엔지니어링에 대해 더 깊이 파보는 중...

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

