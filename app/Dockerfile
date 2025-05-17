# Build
FROM node:slim AS build

WORKDIR /app

COPY frontend/. ./

# install and build
RUN npm install && npm run build


# from a debian image
# FROM debian:bullseye-slim AS runtime
FROM postgres:14 AS runtime
# include postgresl
# RUN apt update && apt install postgresql postgresql-contrib
RUN apt-get update && \
    apt-get install -y python3 python3-pip python3-venv && \
    rm -rf /var/lib/apt/lists/*
# working director
WORKDIR /app
# create directory for UX
RUN mkdir /app/frontend
# copy the build files
COPY --from=build /app/dist /app/frontend/dist/.
# copy python requirements
COPY requirements.txt .
# install
# RUN pip install --no-cache-dir -r requirements.txt
RUN python3 -m venv /opt/venv \
    && . /opt/venv/bin/activate \
    && pip install --no-cache-dir -r requirements.txt
ENV PATH="/opt/venv/bin:$PATH"
# copy support components
RUN mkdir /app/server
# copy
COPY server/. /app/server
# copy entrypoint 
COPY main.py /app/main.py
# set env variables
EXPOSE 5000
# run
ENTRYPOINT ["python","main.py"]