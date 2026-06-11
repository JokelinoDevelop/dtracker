.PHONY: build-local
build-local: ## Build the local docker image.
	docker compose -f docker/local/compose.yaml --env-file apps/api/.env build

.PHONY: start-local
start-local: ## Start the local docker container.
	docker compose -f docker/local/compose.yaml --env-file apps/api/.env up -d

.PHONY: stop-local
stop-local: ## Stop the local docker container.
	docker compose -f docker/local/compose.yaml --env-file apps/api/.env down
