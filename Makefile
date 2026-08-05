.PHONY: lint reformat test-local build

lint:
	npm run check
	npm run format:check

reformat:
	npm run format

test-local:
	npm run test

build:
	npm run build
