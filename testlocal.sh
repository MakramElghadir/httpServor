#!/bin/bash

echo "conectando al servidor remoto..."

cd /servidor-https
git pull origin main
npm install
npm start

echo "proceso completado"