import React from 'react';
import { Link } from 'react-router-dom';
import { Segment,Header, Icon, Button } from 'semantic-ui-react';

export default function NotFound() {
    return(
        <Segment style={{textAlign:'center'}}>
            <Header icon>
                    <Icon name='search' />
                    Oops - we've looked everywhere and could not find this. 
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/activities' primary>
                    Return to the activities page
                </Button>
            </Segment.Inline>
        </Segment>
    )
}