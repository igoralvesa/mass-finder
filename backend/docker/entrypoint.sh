#!/bin/sh
set -e

echo "Creating storage directories..."
mkdir -p storage/framework/{sessions,views,cache/data}
chmod -R 775 storage bootstrap/cache

echo "Installing dependencies..."
composer install --no-interaction

if [ -z "$APP_KEY" ] || grep -q "^APP_KEY=$" .env 2>/dev/null; then
  echo "Generating APP_KEY..."
  php artisan key:generate --force
fi

echo "Waiting for database..."

until php artisan tinker --execute="try { DB::connection()->getPdo(); echo 'DB connected'; } catch (\Exception \$e) { exit(1); }"; do
  sleep 2
done

echo "Running migrations..."
php artisan migrate --force

echo "Running seed..."
php artisan db:seed --force

php artisan l5-swagger:generate

echo "Starting Laravel..."
php artisan serve --host=0.0.0.0 --port=8000
