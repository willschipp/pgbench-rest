from flask import Blueprint, request, jsonify
import psycopg2

select = Blueprint('select',__name__)

def get_db_connection(host,port,username,password,database_name):
    """Establishes a connection to the PostgreSQL database."""
    try:
        conn = psycopg2.connect(
            host=host,
            database=database_name,
            user=username,
            password=password
        )
        return conn
    except psycopg2.Error as e:
        print(f"Error connecting to the database: {e}")
        return None


# SELECT *
# FROM pg_catalog.pg_tables
# WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema'

@select.route('/api/select/tables',methods=['POST'])
def get_tables():
    # default
    host = "localhost"
    port = 5432
    username = "pguser"
    password = "pgpassword"
    database_name = "pgtest"    

    # get a list of tables from postgres
    data = request.get_json()
    host = data.get('host',host)
    port = data.get('port',port)
    username = data.get('username',username)
    password = data.get('password',password) #figure out protection
    database_name = data.get('databaseName',database_name)
    query = "select * from pg_catalog.pg_tables where schemaname != 'pg_catalog' and schemaname != 'information_schema'"
    # get the connection
    try:
        db_connection = get_db_connection(host,port,username,password,database_name)
        # execute
        with db_connection.cursor() as cur:
            cur.execute(query)
            results = cur.fetchall()
        # Convert results to a list of dictionaries
        column_names = [desc[0] for desc in cur.description]
        data = []
        for row in results:
            data.append(dict(zip(column_names, row)))
        return jsonify(data)

    except psycopg2.Error as e:
        print(f"Error executing query: {e}")
        return jsonify({'error': str(e)}), 500 

# CREATE TABLE IF NOT EXISTS people (
#     id SERIAL PRIMARY KEY,  
#     firstName VARCHAR(50) NOT NULL, 
#     lastName VARCHAR(50) NOT NULL,
# ); 

@select.route('/api/select/tables/create',methods=['POST'])
def create_tables():
    # default
    host = "localhost"
    port = 5432
    username = "pguser"
    password = "pgpassword"
    database_name = "pgtest"    

    # get a list of tables from postgres
    data = request.get_json()
    host = data.get('host',host)
    port = data.get('port',port)
    username = data.get('username',username)
    password = data.get('password',password) #figure out protection
    database_name = data.get('databaseName',database_name)
    query = "create table if not exists people (id serial primary key, firstName varchar(50) not null, lastName varchar(50) not null)"
    # get the connection
    try:
        db_connection = get_db_connection(host,port,username,password,database_name)
        # execute
        cursor = db_connection.cursor()
        cursor.execute(query)
        db_connection.commit()
        cursor.close()
        return "",201

    except psycopg2.Error as e:
        print(f"Error executing query: {e}")
        return jsonify({'error': str(e)}), 500 


# sql = f"INSERT INTO people (firstName, lastName) VALUES (%s, %s)"

def insert_multiple_rows(conn, data):
    cursor = conn.cursor()
    sql = f"INSERT INTO people (firstName, lastName) VALUES (%s, %s)"
    cursor.executemany(sql, data)
    conn.commit()
    cursor.close()

@select.route('/api/select/tables/populate',methods=['POST'])
def create_people():
    # default
    host = "localhost"
    port = 5432
    username = "pguser"
    password = "pgpassword"
    database_name = "pgtest"    

    # get a list of tables from postgres
    data = request.get_json()
    host = data.get('host',host)
    port = data.get('port',port)
    username = data.get('username',username)
    password = data.get('password',password) #figure out protection
    database_name = data.get('databaseName',database_name)
    query = "create table if not exists people (id serial primary key, firstName varchar(50) not null, lastName varchar(50) not null)"
    # get the connection
    try:
        db_connection = get_db_connection(host,port,username,password,database_name)
        # generate the data

        data_set = []
        rows = 10
        counter = 0
        while (counter < rows):
            # create a record and add it
            data_set.append((f"firstName {counter}",f"lastName {counter}"))
            # increment
            counter += 1
        # execute
        insert_multiple_rows(db_connection, data_set)
        # return
        return "",201

    except psycopg2.Error as e:
        print(f"Error executing query: {e}")
        return jsonify({'error': str(e)}), 500    


@select.route('/api/select',methods=['POST'])
def get_set():
    # default
    host = "localhost"
    port = 5432
    username = "pguser"
    password = "pgpassword"
    database_name = "pgtest"    
    table_name = "people"
    limit = 10

    # get a list of tables from postgres
    data = request.get_json()
    host = data.get('host',host)
    port = data.get('port',port)
    username = data.get('username',username)
    password = data.get('password',password) #figure out protection
    database_name = data.get('databaseName',database_name)
    table_name = data.get('tableName',table_name)
    limit = data.get('limit',limit)
    query = f"select * from {table_name} limit {limit}" # limit set
    # get the connection
    try:
        db_connection = get_db_connection(host,port,username,password,database_name)
        # execute
        with db_connection.cursor() as cur:
            cur.execute(query)
            results = cur.fetchall()
        # Convert results to a list of dictionaries
        column_names = [desc[0] for desc in cur.description]
        data = []
        for row in results:
            data.append(dict(zip(column_names, row)))
        return jsonify(data)

    except psycopg2.Error as e:
        print(f"Error executing query: {e}")
        return jsonify({'error': str(e)}), 500 
