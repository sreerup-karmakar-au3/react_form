import React, { useState, useEffect } from 'react'
import { Card, CardMedia, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const axios = require('axios')

const useStyles = makeStyles((theme) => ({
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    }
}));

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
                        <Card key={indx}>
                            <CardMedia className={classes.media} image={user.image}/>
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {user.firstname} {user.lastname}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))
                ) : ("")
            }
        </>
    )
}

export default ShowUser;