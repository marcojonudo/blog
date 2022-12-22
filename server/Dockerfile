FROM openjdk:8u171-alpine3.7
LABEL maintainer="marco.martinez@feuvert.es"
EXPOSE 8090
RUN apk --no-cache add curl
COPY build/libs/*.jar portfolio.jar
CMD java -Dcom.sun.management.jmxremote -jar portfolio.jar
