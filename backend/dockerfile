FROM ubuntu:22.04

RUN apt-get update
RUN apt-get install -y openjdk-17-jdk openjdk-17-jre maven

COPY . /app

WORKDIR /app

RUN mvn clean package

RUN mv target/*.jar app.jar

CMD ["java","-jar","app.jar"]