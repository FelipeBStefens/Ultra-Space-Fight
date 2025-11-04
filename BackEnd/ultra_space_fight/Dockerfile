
# Using Maven and Java 21 to the project; 
FROM maven:3.9.6-eclipse-temurin-21 AS build

# Going to app folder;
WORKDIR /app

# Copy pom.xml and Source code;
COPY pom.xml .
COPY src ./src

# Run the Maven to construct project jar file;
RUN mvn clean package -DskipTests

# Using Java Runtime to the project;
FROM eclipse-temurin:21-jre-alpine

# Going to app folder;
WORKDIR /app

# Take the jar file and put it on /app;
COPY --from=build /app/target/*.jar app.jar

# Open 8080 Port to run Spring;
EXPOSE 8080

# Execute this comands, starting server;
ENTRYPOINT ["java", "-jar", "/app/app.jar"]