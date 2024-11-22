FROM node:18-alpine

RUN apk update && apk add --no-cache \
    bash \
    git \
    ca-certificates \
    openjdk17-jre

ENV JAVA_HOME="/usr/lib/jvm/java-17-openjdk"

USER node

WORKDIR /home/node/app

RUN echo 'PS1="\[\e[38;5;46m\]\u@\h:\[\e[38;5;32m\]\w\[\e[0m\]\$ "' >> /home/node/.bashrc

CMD [ "bash", "-l" ]