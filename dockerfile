FROM nginx
LABEL description = "This is a sample Dockerfile for nginx"
MAINTAINER yeoulab <myungjin.shin@gmail.com>
ENV GIT_URL "https://github.com/yeoulab/front.git"
RUN apt-get update && apt-get install git -y && apt-get install vim -y && apt-get install curl -y
RUN git clone $GIT_URL
# config file add
# /front/public/index.html
ADD ./default.conf /etc/nginx/conf.d/default.conf
RUN apt-get update && apt-get install gnupg gnupg1 gnupg2 -y
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install nodejs -y
WORKDIR /front
RUN npm install && npm run build
# listen port
EXPOSE 80
