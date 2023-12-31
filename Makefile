.PHONY: docker-build
docker-build:
	docker-compose build --no-cache --force-rm

.PHONY: init
init:
	@make docker-build
	@make up
	@make install

.PHONY: setup
setup:
	@make up
	@make open
	@make dev

.PHONY: up
up:
	docker-compose up -d

.PHONY: stop
stop:
	docker-compose stop

.PHONY: down
down:
	docker-compose down

.PHONY: restart
restart:
	@make down
	@make up

.PHONY: destroy
destroy:
	docker-compose down --rmi all --volumes

.PHONY: ps
ps:
	docker-compose ps

.PHONY: install
install:
ifeq (${IS_CONTAINER}, true)
	npm install
else
	docker-compose exec node npm install
endif

.PHONY: node
node:
	docker-compose exec node bash

.PHONY: dev
dev:
ifeq (${IS_CONTAINER}, true)
	npm run dev
else
	docker-compose exec node npm run dev
endif

.PHONY: build
build:
ifeq (${IS_CONTAINER}, true)
	npm run build
else
	docker-compose exec node npm run build
endif

.PHONY: start
start:
ifeq (${IS_CONTAINER}, true)
	npm run start
else
	docker-compose exec node npm run start
endif

.PHONY: lint
lint:
ifeq (${IS_CONTAINER}, true)
	npm run lint
else
	docker-compose exec node npm run lint
endif

.PHONY: open
open:
	devcontainer open

.PHONY: generate-openapi
generate-openapi:
	npm run generate-openapi
