## Build commands ##
DOCKER_COMPOSE=docker-compose -f infra/build/docker-compose.yml
RUN=$(DOCKER_COMPOSE) run --rm php

PHP_APPS=dashboard/api \
	trackers/binance \
	analyzer/binance

api-start:
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

npm-start:
	cd apps/dashboard/app && npm start

## Run commands ##
tf-dev-plan:
	cd infra/run && terraform init --backend-config=dev/s3.tfbackend && terraform plan -var-file=dev/config.tfvars
tf-dev-apply:
	cd infra/run && terraform init --backend-config=dev/s3.tfbackend && terraform apply -var-file=dev/config.tfvars -auto-approve
