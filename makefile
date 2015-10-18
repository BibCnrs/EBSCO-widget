.PHONY: default install run test build

install:
	docker-compose run install npm install

build:
	docker-compose run build

dev:
	docker-compose up devserver
