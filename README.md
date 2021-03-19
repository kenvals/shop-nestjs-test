version: "3.9"
    
services:
  db:
    image: mysql:5.7
    volumes:
      - db_data:/var/lib/mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: kenval
      MYSQL_DATABASE: shop
      MYSQL_USER: kenval
      MYSQL_PASSWORD: kenval

volumes:
  db_data: {}