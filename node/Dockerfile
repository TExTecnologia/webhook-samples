FROM node:10.0.0-alpine
LABEL maintainer="docker@lagden.in"

ARG npm_cmd="npm i --progress=false --quiet --production"
ARG port=3000

ENV PORT=$port
ENV HOME=/home/node
ENV APP=$HOME/app
ENV DOCKER_MODE=1

WORKDIR $APP

COPY . .
RUN chown -R node:node $HOME

USER node
RUN $npm_cmd

EXPOSE $port
