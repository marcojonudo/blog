FROM openjdk:8u171-alpine3.7
LABEL maintainer="marcomartinezavila@gmail.com"
EXPOSE 8090
RUN apk --no-cache add curl
COPY build/libs/*.jar blog.jar
CMD java -Dcom.sun.management.jmxremote -jar blog.jar
