# node:latest はDebianベースのイメージを使用します
FROM node:latest
WORKDIR /app
# apt-get を使用して bash をインストールし、キャッシュをクリーンアップします
RUN apt-get update && apt-get install -y bash && rm -rf /var/lib/apt/lists/*
CMD ["npm", "run", "dev"]
