--1
SELECT email FROM customers ORDER BY email;
--2
select id 
from orders 
where customer_id 
in ( select id 
from customers 
where fname = 'Elizabeth' and lname = 'Crocker');
--3
SELECT sum(num_cupcakes) 
FROM orders 
WHERE processed = false;
--4
SELECT c.name, COALESCE(SUM(o.num_cupcakes), 0) AS sum
FROM cupcakes c
LEFT JOIN orders o ON c.id = o.cupcake_id
GROUP BY c.name
ORDER BY c.name ASC;
--5
SELECT cu.email, COALESCE(SUM(o.num_cupcakes), 0) AS total
FROM customers cu
LEFT JOIN orders o ON cu.id = o.customer_id
GROUP BY cu.email
ORDER BY total DESC;
--6
SELECT DISTINCT cu.fname, cu.lname, cu.email
FROM customers cu
JOIN orders o ON cu.id = o.customer_id
JOIN cupcakes c ON o.cupcake_id = c.id
WHERE c.name = 'funfetti' AND o.processed = TRUE;