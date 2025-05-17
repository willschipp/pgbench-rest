# local testing setup

## docker
`docker run --name pg -e POSTGRES_USER=pguser -e POSTGRES_PASSWORD=pgpassword -e POSTGRES_DB=pgtest -p 5432:5432 -d postgres:14`