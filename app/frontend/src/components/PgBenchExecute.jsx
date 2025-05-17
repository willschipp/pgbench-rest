import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, TextField, Content, View, Well, ProgressCircle  } from '@adobe/react-spectrum';

function PgBenchExecute() {

    const [host,setHost] = useState("localhost");
    const [port,setPort] = useState(5432);
    const [username,setUsername] = useState("pguser");
    const [password,setPassword] = useState("");
    const [databaseName,setDatabaseName] = useState("pgtest")
    const [clients,setClients] = useState(10);
    const [threads,setThreads] = useState(2);
    const [transactions,setTransactions] = useState(10000);
    
    const [loading, setLoading] = useState(false); 
    const [response,setResponse] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        //build the payload
        const payload = {
            'host': host,
            'port': port,
            'username':username,
            'password':password,
            'databaseName':databaseName,
            'clients':clients,
            'threads':threads,
            'transactions':transactions,
        }

        try {
            const reply = await fetch('/api/execute',{
                method: 'POST',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify(payload)});
            const result = await reply.json();
            setResponse(result)
        } catch (error) {
            console.log("there's a problem");
            console.error(error);
        } finally {
            setLoading(false);
        }  
         
        return false; //blocker
    }

    return(
        <Content width="calc(100% - size-1000)">
            <Form onSubmit={handleSubmit}>
                <TextField label="Host Name" isRequired={true} value={host} onChange={setHost}/>
                <TextField label="Port" isRequired={true} value={port} onChange={setPort}/>
                <TextField label="Username" isRequired={true} value={username} onChange={setUsername}/>
                <TextField label="Password" isRequired={true} type='password' value={password} onChange={setPassword}/>
                <TextField label="Database Name" isRequired={true} value={databaseName} onChange={setDatabaseName}/>
                <TextField label="Clients" isRequired={true} value={clients} onChange={setClients}/>
                <TextField label="Threads" isRequired={true} value={threads} onChange={setThreads}/>
                <TextField label="Transactions" isRequired={true} value={transactions} onChange={setTransactions}/>
                <Button type="submit" maxWidth="size-1000">Run</Button>
            </Form>
            {loading && (
                <View marginTop="size-200" alignSelf="center">
                    <ProgressCircle
                        aria-label="Loading…"
                        isIndeterminate
                        size="L"
                    />
                </View>
            )}            
            <View>
                <Well marginTop="size-100">
                    <pre style={{
                        whiteSpace:'pre-wrap',
                        margin: 0,
                        fontFamily: 'monospace',
                        maxHeight: '500px',
                        overflow: 'auto'
                    }}>
                        {typeof response === 'string' ? details : JSON.stringify(response,null,2)}
                    </pre>
                </Well>
            </View>  
        </Content>         
    );
}

export default PgBenchExecute;