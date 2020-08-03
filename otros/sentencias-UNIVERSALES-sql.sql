/*
	INSERT.  UPDATE.  SELECT. DELETE
*/

/*  sentencia INSERT
*/
INSERT INTO pets (tipo, raza,color, peso) 
     VALUES ("felino", "persa", "gris", 4);
     
INSERT INTO pets (tipo, raza,color, peso) 
     VALUES ("felino", "egipcio", "gris", 4);
     
INSERT INTO pets (tipo, raza,color, peso) 
     VALUES ("felino", "Bengalí", "gris", 4);     
     
INSERT INTO pets (tipo, raza,color, peso) 
     VALUES ("felino", "Abisinio", "gris", 4);          
          
     
/*  sentencia SELECT
*/
SELECT *
  FROM pets;   

SELECT *
  FROM pets
 WHERE tipo = "felino";   

SELECT *
  FROM pets
 WHERE tipo = "felino"
   AND raza = "persa";
   
 SELECT *
  FROM pets
 WHERE tipo like "%ino%";
   
/*  sentencia UPDATE
*/
UPDATE pets
   SET tipo = "GATO"
   WHERE peso = 4;
 

      
/*  sentencia DELETE
*/

DELETE FROM PETS
WHERE id = 2;


