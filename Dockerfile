FROM nginx:latest

RUN rm -rf /usr/share/nginx/html/*

COPY build /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]