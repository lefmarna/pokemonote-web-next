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
	yarn install
else
	docker-compose exec node yarn install
endif

.PHONY: node
node:
	docker-compose exec node bash

.PHONY: dev
dev:
ifeq (${IS_CONTAINER}, true)
	yarn dev
else
	docker-compose exec node yarn dev
endif

.PHONY: build
build:
ifeq (${IS_CONTAINER}, true)
	yarn build
else
	docker-compose exec node yarn build
endif

.PHONY: start
start:
ifeq (${IS_CONTAINER}, true)
	yarn start
else
	docker-compose exec node yarn start
endif

.PHONY: lint
lint:
ifeq (${IS_CONTAINER}, true)
	yarn lint
else
	docker-compose exec node yarn lint
endif

.PHONY: open
open:
	devcontainer open
