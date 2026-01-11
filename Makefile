.PHONY: up down pull build logs clean

up:
	docker compose up

down:
	docker compose down

pull:
	docker compose pull

build:
	docker compose build

logs:
	docker compose logs -f

clean:
	docker compose down -v
	docker system prune -f