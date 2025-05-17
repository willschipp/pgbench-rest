from flask import Blueprint, request, jsonify
import subprocess
import time
import threading
import queue
import os

main = Blueprint('main',__name__)

CREATE_SET = "PGPASSWORD='PWD' pgbench -i -h HOST -p PORT -U USERNAME -s SCALING DATABASE_NAME"

EXECUTE_SET = "pgbench -h HOST -p PORT -U USERNAME -c CLIENTS -j THREADS -t TRANSACTIONS DATABASE_NAME"

@main.route('/api/setup',methods=['POST'])
def setup():
    # function to setup a pgbench config on a host
    # target command is pgbench -i -h [host] -s [value] [database_name]
    # values are optional
    host = "localhost"
    port = 5432
    username = "pguser"
    password = "pgpassword"
    scaling = 50
    database_name = "pgtest"


    if request.is_json:
        # process values from it
        data = request.get_json()
        host = data.get('host',host)
        port = data.get('port',port)
        username = data.get('username',username)
        password = data.get('password',password) #figure out protection
        database_name = data.get('databaseName',database_name)
        scaling = data.get('scaling',scaling)
        
    
    # substitute
    command = CREATE_SET.replace('HOST',host).replace('PORT',str(port)).replace('USERNAME',username).replace('PWD',password).replace('SCALING',str(scaling)).replace('DATABASE_NAME',database_name)

    # execute the command and wait
    start_time = time.perf_counter()
    end_time = 0
    try:
        result = subprocess.Popen(
            command,
            shell=isinstance(command,str),
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )    
        # inverse for pgbench
        stderr, stdout = result.communicate()
    except subprocess.CalledProcessError as e:
        end_time = time.perf_counter()
        return jsonify({
            "code":e.returncode,
            "error":e.stdout,
            "message":e.stderr
        }),503
    end_time = time.perf_counter()

    if (result.returncode != 0):
        # have an error
        return jsonify({
            "error":stderr,
            "output":stdout,
            "code":result.returncode
        }),503

    elapsed_time = end_time - start_time

    # parse the output into an array
    lines = stdout.split('\n')

    return jsonify({
        "result":lines,
        "timeTaken":elapsed_time
    }),200

# helper function for pgbench stream
def stream_subprocess_output(cmd,env=None):
    def stream(pipe, source, output):
        for line in iter(pipe.readline, ''):
            output.append((source, line.rstrip('\n')))
        pipe.close()

    # Prepare environment
    process_env = os.environ.copy()
    if env:
        process_env.update(env)        

    with subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, bufsize=1,env=process_env) as proc:
        output = []
        threads = [
            threading.Thread(target=stream, args=(proc.stdout, 'stdout', output)),
            threading.Thread(target=stream, args=(proc.stderr, 'stderr', output)),
        ]
        for t in threads:
            t.start()
        while any(t.is_alive() for t in threads) or output:
            while output:
                yield output.pop(0)
        for t in threads:
            t.join()

@main.route('/api/execute',methods=['POST'])
def execute():
    # method to execute a pgbench config
    # command is 
    # pgbench -c [clients] -j [threads] -t [txns] [databasename]
    host = "localhost"
    port = 5432
    username = "pguser"
    password = "pgpassword"
    clients = 10
    threads = 2
    transactions = 10000
    database_name = "pgtest"

    if request.is_json:
        # process values from it
        data = request.get_json()
        host = data.get('host',host)
        port = data.get('port',port)
        username = data.get('username',username)
        password = data.get('password',password) #figure out protection
        database_name = data.get('databaseName',database_name)
        clients = data.get('clients',clients)
        threads = data.get('threads',threads)
        transactions = data.get('transactions',transactions)
    
    # EXECUTE_SET = "PGPASSWORD='PWD' pgbench -h HOST -p PORT -U USERNAME -c CLIENTS -j THREADS -t TRANSACTIONS DATABASE_NAME"
    # substitute
    command = EXECUTE_SET.replace('HOST',host).replace('PORT',str(port)).replace('USERNAME',username).replace('CLIENTS',str(clients))
    command = command.replace('THREADS',str(threads)).replace('TRANSACTIONS',str(transactions)).replace('DATABASE_NAME',database_name)
    cmd = command.split(' ')

    env = {
        'PGPASSWORD':password
    }
    
    lines = []

    # execute the command and wait
    start_time = time.perf_counter()
    end_time = 0
    for source, line in stream_subprocess_output(cmd,env):
        lines.append(line) #just collect the outputs
    end_time = time.perf_counter()

    elapsed_time = end_time - start_time

    return jsonify({
        "result":lines,
        "timeTaken":elapsed_time
    }),200
