FROM ruby:2.5.1-alpine3.7
LABEL maintainer="docker@lagden.in"

ARG port=3000

ENV PORT=$port
ENV API=/usr/src/api
ENV NAME API_WebHook_Sample

RUN bundle config --global frozen 1

WORKDIR $API

COPY . .
RUN bundle install --without development test
EXPOSE $port

CMD ["ruby", "server.rb", "-o", "0.0.0.0"]
