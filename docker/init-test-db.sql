-- Cria o banco de dados de teste se não existir
SELECT 'CREATE DATABASE mass_finder_test'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'mass_finder_test')\gexec
