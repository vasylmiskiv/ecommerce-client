import bcrypt from 'bcrypt'

const users = [
    {
        name: 'Tipichniy admin',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin: true
    },
    {
        name: 'Spider Man',
        email: 'spider@example.com',
        password: bcrypt.hashSync('123456',10),

    },
    {
        name: 'Jhon Snow',
        email: 'jhon@example.com',
        password: bcrypt.hashSync('123456',10),

    }
]

export default users