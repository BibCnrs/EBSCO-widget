.PHONY: default install run test build

install:
	docker-compose run install npm install

run:
	docker-compose up server

test:
	docker-compose run test

build:
	docker-compose run node node_modules/webpack/bin/webpack.js -p
