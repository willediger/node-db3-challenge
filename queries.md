# Database Queries

### Display the ProductName and CategoryName for all products in the database. Shows 76 records.
SELECT p.ProductName, c.CategoryName
FROM Products as p
JOIN Categories as c
ON p.CategoryID = c.CategoryID

### Display the OrderID and ShipperName for all orders placed before January 9, 1997. Shows 161 records.
select o.OrderID, s.ShipperName
from Orders as o
join Shippers as s
on o.ShipperID = s.ShipperID
where o.OrderDate < '1997-01-09'

### Display all ProductNames and Quantities placed on order 10251. Sort by ProductName. Shows 3 records.
select p.ProductName, od.Quantity
from Orders as o
join OrderDetails as od
on o.OrderID = od.OrderID
join Products as p
on od.ProductID = p.ProductID
where o.OrderID = 10251
order by p.ProductName

### Display the OrderID, CustomerName and the employee's LastName for every order. All columns should be labeled clearly. Displays 196 records.
select o.OrderID, c.CustomerName, e.LastName as EmployeeLastName
from Orders as o
join Customers as c
on o.CustomerID = c.CustomerID
join Employees as e
on o.EmployeeID = e.EmployeeID

### (Stretch)  Displays CategoryName and a new column called Count that shows how many products are in each category. Shows 9 records.
select c.CategoryName, count(*) as Count
from Categories as c
join Products as p
on c.CategoryID = p.CategoryID
group by c.CategoryName

### (Stretch) Display OrderID and a  column called ItemCount that shows the total number of products placed on the order. Shows 196 records. 
select od.OrderID, sum(od.Quantity) as ItemCount
from OrderDetails as od
group by od.OrderID