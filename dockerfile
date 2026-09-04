FROM nginx:alpine
COPY index.html /usr/share/nginx/html/index.html
COPY pessoaFisica.js /usr/share/nginx/html/pessoaFisica.js
EXPOSE 80