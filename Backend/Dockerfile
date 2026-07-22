# # Backend/Dockerfile

# # Base Image
# FROM node:18-alpine

# # 1. Chromium aur zaroori PDF fonts install karein
# RUN apk add --no-cache \
#     chromium \
#     nss \
#     freetype \
#     harfbuzz \
#     ca-certificates \
#     ttf-freefont

# # 2. Puppeteer ko batayein ki khudka Chrome download NA kare, aur humara wala use kare
# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
# ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .

# EXPOSE 3000
# CMD ["npm", "start"]

# # 1. Alpine hata kar Standard Node (Debian) use kar rahe hain
# FROM node:20

# # 2. Standard Linux ke commands se Chromium aur Fonts install karein
# RUN apt-get update && apt-get install -y \
#     chromium \
#     fonts-freefont-ttf \
#     --no-install-recommends

# # 3. Puppeteer configuration
# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
# ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# # 4. Standard App Setup
# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .

# EXPOSE 3000
# CMD ["npm", "start"]


# 1. Standard Node (Debian)
FROM node:20

# 2. Puppeteer/Chromium ki saari zaroori Linux dependencies install karein
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-freefont-ttf \
    libnss3 \
    libatk-bridge2.0-0 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    libpangocairo-1.0-0 \
    libcups2 \
    dbus \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# 3. Puppeteer configuration
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# 4. Standard App Setup
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "start"]