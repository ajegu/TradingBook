## Build commands ##
DOCKER_COMPOSE=docker-compose -f infra/build/docker-compose.yml
RUN=$(DOCKER_COMPOSE) run --rm php

PHP_APPS=dashboard/api \
	trackers/binance \
	analyzer/binance

start:
	$(DOCKER_COMPOSE) up -d --remove-orphan

stop:
	$(DOCKER_COMPOSE) kill
	$(DOCKER_COMPOSE) rm -v --force

up:
	$(DOCKER_COMPOSE) up -d --remove-orphan

reset:
	$(DOCKER_COMPOSE) kill
	$(DOCKER_COMPOSE) rm -v --force
	$(DOCKER_COMPOSE) up -d --remove-orphan

tty:
	$(RUN) bash

log:
	$(DOCKER_COMPOSE) logs -f

## Run commands ##
