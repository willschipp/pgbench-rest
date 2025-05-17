import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Content, Heading, Link } from '@adobe/react-spectrum';

function Home() {

    const navigate = useNavigate();

    return (
        <Content width="calc(100% - size-1000)">
            <Heading level={3}>The App!</Heading>
            <p>This App allows you to trigger pgbench runs through a simple form.</p>
            <Heading level={3}>Good Luck!</Heading>
        </Content>
    )
}


export default Home;