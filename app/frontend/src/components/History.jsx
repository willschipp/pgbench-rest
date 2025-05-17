import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Content, TableView, Column, Row, TableHeader, Cell, TableBody, Button, View, Well } from '@adobe/react-spectrum';
import ViewDetail from '@spectrum-icons/workflow/ViewDetail';

function History() {

    const [data,setData] = useState([]);
    const [details, setDetails] = useState([]);

    const loadData = async () => {
        try {
            //get all the results
            const response = await fetch('/api/results');
            if (!response.ok) {
                throw new Error(`http error! status: ${response.status}`);
            }
            const result = await response.json();
            console.log(result);
            setData(result);            
        } catch (error) {
            console.log(error);
        }
    }

    const handleView = (idx) => {
        setDetails(data[idx]);
    }

    useEffect(() => {
        loadData();
    },[]);

    return (
        <Content>                        
            <TableView width="calc(100% - size-1000)">
                <TableHeader>
                    <Column>Result Timestamp</Column>
                    <Column>Action</Column>
                </TableHeader>   
                <TableBody>
                {data.length > 0 ? 
                        (data.map((item,index) => (
                            <Row key={index}>
                                <Cell>
                                    {item.timestamp}
                                </Cell>
                                <Cell>
                                    <Button onPress={() => handleView(index)}>
                                        <ViewDetail/>
                                    </Button>                                    
                                </Cell>
                            </Row>
                        ))) : (
                            <Row>
                                <Cell colSpan={2}>No History available</Cell>
                            </Row>
                        )
                    }
                </TableBody>         
            </TableView>
            <View>
                <Well marginTop="size-100">
                    <pre style={{
                        whiteSpace:'pre-wrap',
                        margin: 0,
                        fontFamily: 'monospace',
                        maxHeight: '500px',
                        overflow: 'auto'
                    }}>
                        {typeof details === 'string' ? details : JSON.stringify(details,null,2)}
                        {/* {details} */}
                    </pre>
                </Well>
            </View>            
        </Content>
    );
}

export default History;