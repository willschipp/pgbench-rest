import { useState } from 'react';

import { Form, Button, TextField, Content, View, Well, ProgressCircle, ToastQueue  } from '@adobe/react-spectrum';

function Browser() {

    const [host,setHost] = useState("localhost");
    const [port,setPort] = useState(5432);
    const [username,setUsername] = useState("pguser");
    const [password,setPassword] = useState("");
    const [databaseName,setDatabaseName] = useState("pgtest");
    const [tableName,setTableName] = useState("people");
    const [limit,setLimit] = useState(10);

    const [loading, setLoading] = useState(false); 
    const [response,setResponse] = useState(null);

    const handleCreateTable = async (e) => {
        //handle the request to populate people
        if (password === "") {
            ToastQueue.negative("Password not set");
            return; //just flunk out
        }

        //build the payload
        setLoading(true);
        
        //build the payload
        const payload = {
            'host': host,
            'port': port,
            'username':username,
            'password':password,
            'databaseName':databaseName
        }

        try {
            const reply = await fetch('/api/select/create',{
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

const handlePopulate = async (e) => {
        //handle the request to populate people
        if (password === "") {
            ToastQueue.negative("Password not set");
            return; //just flunk out
        }

        //build the payload
        setLoading(true);

        if (password === "") {
            ToastQueue.negative("Password not set");
            return; //just flunk out
        }        
    
        //build the payload
        const payload = {
            'host': host,
            'port': port,
            'username':username,
            'password':password,
            'databaseName':databaseName
        }

        try {
            const reply = await fetch('/api/select/tables/populate',{
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

    const handleQuery = async (e) => {
        if (password === "") {
            ToastQueue.negative("Password not set");
            return; //just flunk out
        }

        //build the payload
        setLoading(true);
        
        //build the payload
        const payload = {
            'host': host,
            'port': port,
            'username':username,
            'password':password,
            'databaseName':databaseName,
            'tableName':tableName,
            'limit':limit
        }

        try {
            const reply = await fetch('/api/select',{
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        //build the payload
        const payload = {
            'host': host,
            'port': port,
            'username':username,
            'password':password,
            'databaseName':databaseName
        }

        try {
            const reply = await fetch('/api/select/tables',{
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

    return (
        <Content width="calc(100% - size-1000)">
            <Form onSubmit={handleSubmit}>
                <TextField label="Host Name" isRequired={true} value={host} onChange={setHost}/>
                <TextField label="Port" isRequired={true} value={port} onChange={setPort}/>
                <TextField label="Username" isRequired={true} value={username} onChange={setUsername}/>
                <TextField label="Password" isRequired={true} type='password' value={password} onChange={setPassword}/>
                <TextField label="Database Name" isRequired={true} value={databaseName} onChange={setDatabaseName}/>
                <TextField label="Table Name" isRequired={false} value={tableName} onChange={setTableName}/>
                <TextField label="Query Row Limit" isRequired={false} value={limit} onChange={setLimit}/>
                <Button type="submit" maxWidth="size-1000">Execute</Button>
                <Button variant='secondary' maxWidth="size-1000" onPress={handleQuery}>Query Table</Button>
                <Button variant='secondary' maxWidth="size-1000" onPress={handleCreateTable}>Create Table</Button>
                <Button variant='secondary' maxWidth="size-1000" onPress={handlePopulate}>Populate Table</Button>
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

export default Browser;