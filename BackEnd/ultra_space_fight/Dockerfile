# ===== Stage 1: Build do JAR =====
FROM maven:3.9.2-eclipse-temurin-21 AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia apenas o pom.xml primeiro (otimiza cache do Docker)
COPY pom.xml .

# Copia a pasta src
COPY src ./src

# Roda o build do Maven (skip tests para acelerar)
RUN mvn clean package -DskipTests

# ===== Stage 2: Rodar o JAR =====
FROM eclipse-temurin:21-jre-alpine

# Define diretório de trabalho
WORKDIR /app

# Copia o JAR buildado do stage anterior
COPY --from=build /app/target/ultra_space_fight-0.0.1-SNAPSHOT.jar app.jar

# Expõe a porta (Render injeta a variável PORT automaticamente)
ENV PORT=8080

# Comando para rodar o JAR
ENTRYPOINT ["java", "-jar", "/app/app.jar"]