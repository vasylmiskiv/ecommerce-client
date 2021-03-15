import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserDetails, updateUserProfile} from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {Button, Col, Form, Row} from "react-bootstrap";


const ProfileScreen = ({ history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    //забираем обьекты со стейта
    const {loading, error, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile


        useEffect(()=>{
            if(!userInfo) {
                history.push('/login')
            } else {
                if(!user.name) {
                    dispatch(getUserDetails('profile'))
                    //console.log('getUserDetails')
                } else {
                    setName(user.name)
                    setEmail(user.email)
                }
            }
        },[userInfo, user, dispatch, history])

    const sumbitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            setMessage('Password do not match')
        } else {
           dispatch(updateUserProfile({id: user._id, name, email, password}))
        }
    }

    //console.log(success)

    return <Row>
            <Col md ={5}>
                <h1>User Profile</h1>
                {success && <Message variant="primary">{ success }</Message>}
                {message && <Message variant="danger">{message}</Message>}
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader/>}
                <Form onSubmit={sumbitHandler}>

                    <Form.Group controlId = 'name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type = "name"
                            placeholder = "Your name"
                            value = {name}
                            onChange = {e=> setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId = 'email'>
                        <Form.Label>Email Adress</Form.Label>
                        <Form.Control
                            type = "email"
                            placeholder = "Your email"
                            value = {email}
                            onChange = {e=> setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId = 'password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type = "password"
                            placeholder = "Your password"
                            value = {password}
                            onChange = {e=> setPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId = 'confirmPassword'>
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control
                            type = "password"
                            placeholder = "Your confirmed password"
                            onChange={e => setConfirmPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Button type = "submit" variant="outline-primary">
                        Update
                    </Button>
                </Form>

            </Col>
            <Col md ={7}>
                <h2>My orders</h2>

            </Col>

        </Row>
}

export default ProfileScreen