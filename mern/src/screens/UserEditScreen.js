import React, {useState, useEffect}from 'react'
import  {Link} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {getUserDetails} from '../actions/userActions'
import Message from "../components/Message"


const UserEditScreen = ({match, history}) => {
    const userId = match.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState('')

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)

    const {loading, error, user} = userDetails

    console.log(isAdmin)

    useEffect(()=>{
        if(!user.name || user._id !== userId) {
              dispatch(getUserDetails(userId))
        } else {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    },[user, userId, dispatch])

    //submit
    const submitHandler = (e) => {
        e.preventDefault()
    }

    return (
        <>
        <Link to = '/admin/userlist' className = 'btn btn-light my-3'>
            Go back
        </Link>
<FormContainer>
        <h1>Edit user</h1>
        {loading ? <Loader/> : error ? <Message variant ="danger">{error}</Message> : (
            <Form onSubmit = {submitHandler}>

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

<Form.Group controlId = 'isAdmin'>
    <Form.Label>Password</Form.Label>
    <Form.Check
        type = "checkbox"
        label = "isAdmin"
        checked = {isAdmin}
        onChange = {e=> setIsAdmin(e.target.checked)}
    >
    </Form.Check>
</Form.Group>

<Button type = "submit" variant="outline-primary">
    Update
</Button>
</Form>
        )}

    </FormContainer>

    </>
    )
}


export default UserEditScreen