FROM openjdk:17-alpine3.13

RUN mkdir -p /home/app/server
WORKDIR /home/app/server

COPY .mvn/ /home/app/server/.mvn

COPY mvnw /home/app/server
COPY pom.xml /home/app/server
RUN ./mvnw dependency:go-offline

COPY src /home/app/server/src

CMD ["./mvnw", "spring-boot:run"]