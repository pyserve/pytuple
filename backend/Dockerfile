FROM python:3.12-slim

ENV PYTHONUNBUFFERED=1

ENV VLLM_DEVICE=cpu
ENV VLLM_LOGGING_LEVEL=DEBUG

WORKDIR /app

RUN apt-get update && \
  apt-get install -y gcc libpq-dev && \
  rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . .

EXPOSE 8001

CMD ["daphne", "-b", "0.0.0.0", "-p", "8000", "backend.asgi:application"]
