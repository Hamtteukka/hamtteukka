FROM python:3.12.8

WORKDIR /code

RUN pip install --upgrade pip

COPY . /code
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt                              
EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]