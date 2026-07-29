.PHONY: lint reformat test-local build

lint:
	npm run check

reformat:
	npm run format

test-local:
	npm run test

build:
	npm run build
