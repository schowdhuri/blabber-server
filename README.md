# Docker OpenFire & MariaDB

1. Create a `.env` file with

```
MYSQL_DATABASE=<db name>
MYSQL_USER=<db user>
MYSQL_PASSWORD=<db passwd>
MYSQL_ROOT_PASSWORD=<root passwd>
```

2. Start:

```sh
docker-compose up
```

3. Head to `http://127.0.0.1:9090` to complete the OpenFire setup process
