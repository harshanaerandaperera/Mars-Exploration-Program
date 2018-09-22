create or replace FUNCTION totalEmp
RETURN number IS
   total number(2) := 0;
BEGIN
   SELECT count(*) into total
   FROM EMP ;

   RETURN total;
END;
/

