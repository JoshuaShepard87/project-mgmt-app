pg_dump -h host -p port -w -U user db > dump.sql

# Dump the table from the source database
PGPASSWORD="source-db-password" pg_dump -h source-db-hostname -U source-db-username -d source-database-name -t source-table-to-copy > table-to-copy.sql
# Now you can load the table into the destination database
PGPASSWORD="destination-db-password" psql -h destination-db-hostname -U destination-db-username -d destination-database-name -f table-to-copy.sql

# Dump tables 1, 3 and 3 from the source database
PGPASSWORD="source-db-password" pg_dump -h source-db-hostname -U source-db-username -d source-database-name -t table1 -t table2 -t table3 > table-to-copy.sql