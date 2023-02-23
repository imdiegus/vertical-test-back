#ubuntu version
FROM ubuntu:18.04
#create project dir
RUN mkdir /src
#set project dir
WORKDIR /src
#move project data to project dir
COPY . /src/
#clean npm cache for preventing fuure issues
RUN npm cache clean --force
#install dependecies
RUN npm install
#run dev script
RUN npm run start:dev