import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const FormControl = () => {

    const [users, setUsers] = useState([]);
    // const [userS] = users;
    console.log(users)
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const body = form.body.value;
        const user = form.user.value;
        console.log(title, body, user)

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'post',
            body: JSON.stringify({
                title: title,
                body: body,
                userId: user
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => console.log(json))

    }

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch((error) => {
                console.error(error)
            })
    }, [])

    return (

        <form onSubmit={handleSubmit}>
            <div>
                <label>Select an user: </label>
                <select name="user" >

                    {users.map(user => <option value={user.id}>{user.name}</option>)}
                </select>
            </div>
            <div>
                <label htmlFor="email">Title: </label>
                <input type="text" name="title" required />
            </div>
            <div>
                <label htmlFor="password">Body: </label>
                <input type="text" name="body" required />
            </div>
            <input type="submit" value="Submit" />
        </form>
    );
};

export default FormControl;