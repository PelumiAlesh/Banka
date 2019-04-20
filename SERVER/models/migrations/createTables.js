
  CREATE TABLES users(
   id SERIAL PRIMARY KEY,
   email VARCHAR NOT NULL UNIQUE,
   firstName VARCHAR NOT NULL,
   lastName VARCHAR NOT NULL,
   password TEXT NOT NULL,
   type TEXT NOT NULL,
   isAdmin BOOLEAN
  );
  CREATE 
