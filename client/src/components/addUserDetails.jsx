import React, { useState } from 'react'
import { Alert, AlertTitle } from '@material-ui/lab'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'

const axios = require('axios')

function AddUserDetails() {
    const [ details, setDetails] = useState({
        image: "",
        firstname: "",
        lastname: "",
        email: "",
        phone: ""
    });
    const [errors, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [messages, setMessages] = useState([]);

    let handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post('/api/user', details)
        .then(res => {
            setError(false);
            setMessages([]);
            setSuccess(true);
            setMessages([res.data]);
        })
        .catch(err => {
            setSuccess(false);
            setError(true);
            setMessages([]);
            (err.response.data.errors).forEach(element => {
                setMessages(messages => [...messages, element.msg]);
            });
        });
    }

    return (
        <>
            {
                (errors && messages.length>0) ? (
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        <ul>
                            {
                                messages.map((item, indx) => (
                                    <li key={indx}>{item}</li>
                                ))
                            }
                        </ul>
                    </Alert>
                ) : ""
            }
            {
                success && (<Alert severity="success">{messages}</Alert>)
            }
            <form noValidate autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
                <TextField id="standard-full-width" fullWidth style={{ margin: 8 }} label="Image link" onChange={(e) => setDetails({...details, image: e.target.value})}/>
                <TextField id="standard-full-width" fullWidth style={{ margin: 8 }} label="Firstname" onChange={(e) => setDetails({...details, firstname: e.target.value})}/>
                <TextField id="standard-full-width" fullWidth style={{ margin: 8 }} label="Lastname" onChange={(e) => setDetails({...details, lastname: e.target.value})}/>
                <TextField id="standard-full-width" fullWidth style={{ margin: 8 }} label="Email ID" onChange={(e) => setDetails({...details, email: e.target.value})}/>
                <TextField id="standard-full-width" fullWidth style={{ margin: 8 }} label="Phone number" onChange={(e) => setDetails({...details, phone: e.target.value})}/>
                <Button variant="contained" type="submit" color="primary" size="small" startIcon={<SaveIcon/>}>Save</Button>
            </form>
        </>
    )
}

export default AddUserDetails;