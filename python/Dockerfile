FROM python:3.6.5-alpine3.7
LABEL maintainer="docker@lagden.in"

ARG port=3000

ENV PORT=$port
ENV API=/usr/src/api
ENV NAME API_WebHook_Sample

WORKDIR $API

COPY . .
RUN pip install --trusted-host pypi.python.org --no-cache-dir -r requirements.txt
EXPOSE $port

CMD ["python", "server.py"]
