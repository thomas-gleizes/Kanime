FROM debian:wheezy

MAINTAINER Thomas Gleizes <thomasgleizes34@gmail.com>

RUN apt update && apt install apache2
