.PHONY: default install run test build

# If the first argument is one of the supported commands...
SUPPORTED_COMMANDS := npm
SUPPORTS_MAKE_ARGS := $(findstring $(firstword $(MAKECMDGOALS)), $(SUPPORTED_COMMANDS))
ifneq "$(SUPPORTS_MAKE_ARGS)" ""
    # use the rest as arguments for the command
    COMMAND_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
    # ...and turn them into do-nothing targets
    $(eval $(COMMAND_ARGS):;@:)
endif

install:
	docker-compose run npm install

build:
	docker-compose run build

dev:
	docker-compose up --force-recreate devserver

test-mocha:
	docker-compose run test

test-e2e:
	docker-compose -f docker-compose.e2e.yml run --rm test

selenium:
	docker-compose -f docker-compose.e2e.yml up -d chrome firefox

selenium-debug:
	docker-compose -f docker-compose.e2e.yml up -d chromedebug firefoxdebug

cleanup-e2e:
	docker-compose -f docker-compose.e2e.yml stop
	docker-compose -f docker-compose.e2e.yml rm -vf

test: test-mocha selenium test-e2e

npm:
	docker-compose run --rm npm $(COMMAND_ARGS)

serve:
	docker-compose -f docker-compose.serve.yml up;
