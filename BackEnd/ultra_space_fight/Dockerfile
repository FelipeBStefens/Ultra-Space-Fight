## 

# ===== Stage 1: Build (Ajustamos a TAG da imagem) =====
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Copia pom.xml e código fonte
COPY pom.xml .
COPY src ./src

# Build do JAR
RUN mvn clean package -DskipTests

# ===== Stage 2: Runtime (Imagem leve com JRE) =====
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copia JAR do stage anterior (Usando curinga para evitar erro de nome)
COPY --from=build /app/target/*.jar app.jar

# Expõe porta (Render usará a variável PORT, mas é boa prática)
EXPOSE 8080

# Comando de execução
ENTRYPOINT ["java", "-Dserver.port=${PORT}", "-jar", "/app/app.jar"]