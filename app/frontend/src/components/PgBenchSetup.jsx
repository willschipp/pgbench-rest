import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, TextField, Content, View, Well  } from '@adobe/react-spectrum';

function PgBenchSetup() {

    const [host,setHost] = useState("localhost");
    const [port,setPort] = useState(5432);
    const [username,setUsername] = useState("pguser");
    const [password,setPassword] = useState("");
    const [databaseName,setDatabaseName] = useState("pgtest")
    const [scaling,setScaling] = useState(5);
    
    const [response,setResponse] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        //build the payload
        const payload = {
            'host': host,
            'port': port,
            'username':username,
            'password':password,
            'databaseName':databaseName,
            'scaling':scaling
        }

        try {
            const reply = await fetch('/api/setup',{
                method: 'POST',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify(payload)});
            const result = await reply.json();
            setResponse(result)
        } catch (error) {
            console.log("there's a problem");
            console.error(error);
        }   
         
        return false; //blocker
    }

    const handleNavigate = (e) => {
        // check if there's a config done
        if (response === null || response === 'null') {
            // no response, do nothing
            return;
        } //end if
        navigate('/execute');
    }


    return(
        <Content width="calc(100% - size-1000)">
            <Form onSubmit={handleSubmit}>
                <TextField label="Host Name" isRequired={true} value={host} onChange={setHost}/>
                <TextField label="Port" isRequired={true} value={port} onChange={setPort}/>
                <TextField label="Username" isRequired={true} value={username} onChange={setUsername}/>
                <TextField label="Password" isRequired={true} type='password' value={password} onChange={setPassword}/>
                <TextField label="Database Name" isRequired={true} value={databaseName} onChange={setDatabaseName}/>
                <TextField label="Scaling (multiple of database size)" isRequired={true} value={scaling} onChange={setScaling}/>
                <Button type="submit" maxWidth="size-1000">Save</Button>
            </Form>
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
                <Button type="button" variant="secondary" maxWidth="size-1000" onPress={handleNavigate}>Execute</Button>
            </View>  
        </Content>        
    )
}

export default PgBenchSetup;