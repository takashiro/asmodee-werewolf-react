FROM nginx:1.20.2-alpine
COPY dist /usr/share/nginx/html
COPY conf/nginx.conf /etc/nginx/nginx.conf
