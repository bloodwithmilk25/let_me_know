FROM python:3.6

ENV PYTHONUNBUFFERED 1

RUN mkdir /www
WORKDIR /www
ADD requirements.txt /www/
RUN pip install -r requirements.txt

ADD . /www/