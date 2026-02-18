const asyncHandler = require('../utils/asyncHandler');
const AuthService = require('../services/authService');

class AuthController {
    //Register a new user
    /*registration means:
    Accepting user details from the client (name,PHONE NO., password, etc.)
    Hashing the password securely
    Saving the user in the database
    Generating a JWT token for authentication
    Returning safe user data (without password) to the client */

    static register = asyncHandler(async(req,res)=>{
        const {user,token} = await AuthService.register(req.body);

        res.status(201).json({
            success:true,
            message : 'User registered successfully.',
            token,
            data : user
        });
    });

    //login user {already exists -> provide email and password -> verify -> generate token -> return safe user data and token}
    static login = asyncHandler(async(req,res)=>{
        const {phone, password} = req.body;
        const {user, token} = await AuthService.login(phone, password);
        res.status(200).json({
            success:true,
            message : 'Login Successful.',
            token,
            data : user
    });
});

//get the presently logged in user at teh time of frontend refresh
static getMe = asyncHandler(async(req,res) => {
    const user = await AuthService.getUserById(req.user.id); //req.user is set in authMiddleware
    res.status(200).json({
        success: true,
        data: user
    });
});

//logout the user
 static logout = asyncHandler(async (req, res) => {

    // 1. Clear the token cookie
    res.clearCookie('token');


    res.status(200).json({
      success: true,
      message: 'Logged out successfully. Please remove token from client storage.'
    });
  });

}

module.exports = AuthController;