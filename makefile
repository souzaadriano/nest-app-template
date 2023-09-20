containers:
	docker compose -f .setup/docker/docker-compose.yml -p "store-app" up -d

stop-containers:
	docker compose -f .setup/docker/docker-compose.yml stop

show-containers:
	docker compose -f .setup/docker/docker-compose.yml ps

schema:
	@bash ./scripts/generate-schema.sh

migrations:
	@bash yarn migrations:up