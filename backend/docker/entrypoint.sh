#!/bin/sh
set -e

echo "Waiting for database..."

until php artisan tinker --execute="try { DB::connection()->getPdo(); echo 'DB connected'; } catch (\Exception \$e) { exit(1); }"; do
  sleep 2
done

echo "Running migrations..."
php artisan migrate --force

echo "Running seed..."
php artisan db:seed --force

echo "Starting Laravel..."
php artisan serve --host=0.0.0.0 --port=8000
