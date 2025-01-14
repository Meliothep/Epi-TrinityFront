#!/bin/bash

echo "Starting Trinity Frontend Development Environment..."

if [ ! -f .env ]; then
    echo "Creating .env file from template..."
    cp .env.template .env
fi

echo "Starting Docker development environment..."
docker compose up app-dev 