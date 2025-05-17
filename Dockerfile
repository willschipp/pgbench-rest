# from an ubuntu image
FROM debian:bullseye-slim 
# include postgresl
RUN apt update && apt install postgresql postgresql-contrib