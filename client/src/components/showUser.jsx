import React, { useState, useEffect } from 'react'
import { Card, CardMedia, CardContent, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const axios = require('axios')

const useStyles = makeStyles({
    root: {
        margin: 25
    },
    media: {
        height: 300
    }
});

function ShowUser() {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios.get('/api/details')
        .then(res => {
            setUsers(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    }, [users]);
    return (
        <>
            {
                (users.length > 0) ? (
                    users.map((user, indx) => (
                        <Card key={indx} className={classes.root}>
                            <CardMedia className={classes.media} image={user.image}/>
                            <CardContent>
                                <Box display="flex" justifyContent="space-evenly">
                                    <span>Name: {user.firstname} {user.lastname}</span>
                                    <span>Email: {user.email}</span>
                                    <span>Phone: {user.phone}</span>
                                </Box>
                            </CardContent>
                        </Card>
                    ))
                ) : ("")
            }
        </>
    )
}

export default ShowUser;