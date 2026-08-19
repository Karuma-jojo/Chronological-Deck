FROM node:22-alpine

WORKDIR /app

COPY chatgpt-app/package.json ./chatgpt-app/package.json
RUN cd chatgpt-app && npm install --omit=dev

COPY js ./js
COPY scripts ./scripts
COPY chatgpt-app ./chatgpt-app

WORKDIR /app/chatgpt-app
ENV PORT=8787
EXPOSE 8787

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:${PORT}/health || exit 1

CMD ["node", "server.js"]

