FROM node:14

# Configure Yarn to use Taobao NPM mirror
# RUN yarn config set registry https://registry.npm.taobao.org

WORKDIR /app
COPY . .
RUN yarn install
ENTRYPOINT ["yarn"]
CMD ["serve"]

# Some magic to re-enable hot reload in containerized dev server
# https://daten-und-bass.io/blog/enabling-hot-reloading-with-vuejs-and-vue-cli-in-docker/
ENV CHOKIDAR_USEPOLLING=true
