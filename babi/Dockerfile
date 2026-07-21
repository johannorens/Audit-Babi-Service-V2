# syntax=docker/dockerfile:1

FROM php:8.4-cli


# Dépendances système + extensions PHP
RUN apt-get update && apt-get install -y --no-install-recommends \
    git unzip libzip-dev libpng-dev gosu \
    && docker-php-ext-install pdo_mysql zip pcntl \
    && rm -rf /var/lib/apt/lists/*

# Installation Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer


WORKDIR /var/www/html


# Cache Composer Docker BuildKit
COPY composer.json composer.lock ./


ENV COMPOSER_PROCESS_TIMEOUT=2000
ENV COMPOSER_MAX_PARALLEL_HTTP=2


# Force l'utilisation de l'API GitHub (zipball) plutôt que legacy.zip
RUN composer config -g github-protocols https


RUN --mount=type=cache,target=/root/.composer/cache \
    composer install \
    --no-interaction \
    --no-scripts \
    --no-autoloader \
    --prefer-dist \
    --no-progress \
    || composer install \
    --no-interaction \
    --no-scripts \
    --no-autoloader \
    --prefer-dist \
    --no-progress


# Copie du projet
COPY . .


# Génération autoload Laravel
RUN composer dump-autoload --optimize


# Permissions Laravel
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 storage bootstrap/cache



# Entrypoint
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

RUN chmod +x /usr/local/bin/docker-entrypoint.sh



# Exécution non-root (correction Trivy DS-0002)
USER www-data


EXPOSE 8000


# Healthcheck
HEALTHCHECK --interval=30s \
    --timeout=5s \
    --start-period=15s \
    --retries=3 \
    CMD php -r "exit(@file_get_contents('http://127.0.0.1:8000') === false ? 1 : 0);"


ENTRYPOINT ["docker-entrypoint.sh"]


CMD ["sh", "-c", "php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=8000 --no-reload"]
