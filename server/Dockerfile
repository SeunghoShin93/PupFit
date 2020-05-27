FROM python:3.8.3

ENV PYTHONUNBUFFERED 1

COPY . /usr/src/app

RUN apt-get update && apt-get install -y vim

COPY static /static