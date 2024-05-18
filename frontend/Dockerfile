# ベースイメージを指定
FROM node:18.17.1

# 作業ディレクトリを設定
WORKDIR /app

# キャッシュ利用で効率化するために別でコピー
COPY package.json package-lock.json ./

# ソースコードをコピー
COPY . .

# 依存関係をインストール
RUN npm install 
#&& npm install @emotion/react @emotion/styled && npm install @mui/material && npm install react-hook-form

# アプリケーションをビルド
RUN npm run build

# ポート番号を指定
EXPOSE 3000

# アプリケーションを起動
CMD ["npm","run","dev"]
#CMD ["sh", "-c", "yarn add next react react-dom && yarn dev"]