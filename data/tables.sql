
DROP TABLE IF EXISTS usuarios CASCADE;

CREATE TABLE usuarios
(
    id              bigserial    PRIMARY KEY
  , nombre          varchar(255) NOT NULL
  , passw	    varchar(255) NOT NULL
);
