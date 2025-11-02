FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

COPY target/ultra_space_fight-0.0.1-SNAPSHOT.jar app.jar

ENV PORT=8080

ENTRYPOINT ["java","-jar","/app/app.jar"]
