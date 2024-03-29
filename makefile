.PHONY: default install run test build

UID = $(shell id -u)
GID = $(shell id -g)

export UID
export GID

# If the first argument is one of the supported commands...
SUPPORTED_COMMANDS := npm
SUPPORTS_MAKE_ARGS := $(findstring $(firstword $(MAKECMDGOALS)), $(SUPPORTED_COMMANDS))
ifneq "$(SUPPORTS_MAKE_ARGS)" ""
    # use the rest as arguments for the command
    COMMAND_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
    # ...and turn them into do-nothing targets
    $(eval $(COMMAND_ARGS):;@:)
endif

DOCKER_COMPOSE_E2E = docker-compose -p bibCnrs-e2e -f docker-compose.e2e.yml

install:
	docker-compose run --rm npm install --legacy-peer-deps

build:
	docker-compose run --rm build

run-dev:
	docker-compose up --force-recreate devserver

test-mocha:
	docker-compose run --rm test

test-e2e:
	$(DOCKER_COMPOSE_E2E) down
	$(DOCKER_COMPOSE_E2E) up --force-recreate -d app server
	$(DOCKER_COMPOSE_E2E) run --rm --no-deps e2e
	$(DOCKER_COMPOSE_E2E) down

test : install test2

test2: test-mocha test-e2e

npm:
	docker-compose run --rm npm $(COMMAND_ARGS)

serve:
	docker-compose -f docker-compose.serve.yml up --force-recreate;

e2e-local:
	$(DOCKER_COMPOSE_E2E) down
	$(DOCKER_COMPOSE_E2E) up --force-recreate -d app server
