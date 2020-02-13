import React from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';

export const App: React.FC = ({ children }) => (
         <Segment basic>
           <Container fluid>
             <Header as="h2">Hacker News Top 30</Header>
             {children}
           </Container>
         </Segment>
       );
