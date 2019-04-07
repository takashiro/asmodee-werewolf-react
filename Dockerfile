FROM nginx:1.15.10
COPY dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
