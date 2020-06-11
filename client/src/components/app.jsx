import React from 'react'
import Container from '@material-ui/core/Container'

import AddUserDetails from './addUserDetails'
import ShowUser from './showUser'

function App() {
    return (
        <Container maxWidth="sm">
            <AddUserDetails/>
            <ShowUser/>
        </Container>
    )
}

export default App;