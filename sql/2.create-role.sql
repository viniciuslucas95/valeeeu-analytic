CREATE ROLE analytic WITH
	LOGIN
	NOSUPERUSER
	NOCREATEDB
	NOCREATEROLE
	INHERIT
	NOREPLICATION
	CONNECTION LIMIT -1
	PASSWORD 'analytic';

GRANT CONNECT ON DATABASE server TO supertest;