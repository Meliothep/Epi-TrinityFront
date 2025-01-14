@echo off
echo Starting Trinity Frontend Development Environment...

if not exist .env (
    echo Creating .env file from template...
    copy .env.template .env
)

echo Starting Docker development environment...
docker compose up app-dev 