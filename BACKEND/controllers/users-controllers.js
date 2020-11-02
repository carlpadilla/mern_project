const { v4: uuidv4 } = require('uuid')
const {validationResult} = require('express-validator')

const HttpError = require('../models/http-error')


const DUMMY_USERS = [
    {
        id: 'u1',
        name: "carl Padilla",
        email: 'test@example.com',
        password: 'password123'
    }
]


const getUsers = (req,res, next ) => {
    res.status(200).json({users: DUMMY_USERS})

}

const signup = (req,res, next ) => {
    const {name, email, password} = req.body
    const errors = validationResult(req)

    if(!errors.isEmpty()){
      throw new HttpError('invalid input passed', 422)
    }

    const hasUser = DUMMY_USERS.find(u=> u.email === email)

    if(hasUser){
        throw new HttpError('email already exists.', 422)
    }

    const createdUser ={
        id: uuidv4(),
        name,
        email,
        password
        }
    
        DUMMY_USERS.push(createdUser)
    
        res.status(201).json({user: createdUser})
    
}

const login = (req,res, next ) => {
    const {email, password} = req.body

    const identifiedUser = DUMMY_USERS.find(u => u.email === email)

    if(!identifiedUser || identifiedUser.password !== password){
        throw new HttpError('Could not identify user, possible incorrect credentials', 401)

    }

    res.json({message: 'logged in'})
    
   
}


exports.getUsers = getUsers
exports.signup = signup
exports.login = login