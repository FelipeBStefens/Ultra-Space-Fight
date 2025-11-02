# ===== Stage 1: Build =====
FROM maven:3.9.2-eclipse-temurin-21 AS build
WORKDIR /app

# Copia pom e src
COPY pom.xml .
COPY src ./src

# Build do JAR (skip tests para agilizar)
RUN mvn clean package -DskipTests

# ===== Stage 2: Runtime =====
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copia JAR do stage anterior
COPY --from=build /app/target/ultra_space_fight-0.0.1-SNAPSHOT.jar app.jar

# Expõe porta (Render injeta PORT automaticamente)
ENV PORT=8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]