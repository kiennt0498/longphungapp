FROM openjdk:21-jdk-slim
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser

WORKDIR /app
RUN mkdir -p /app/uploads && chown -R appuser:appgroup /app/uploads
COPY target/*jar app.jar

USER appuser

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]