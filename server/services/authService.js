import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../Schema/User.js";
import ErrorResponse from '../utils/errorResponse.js';





//alll authService code inside class to group it all under one meaningful unit,to provide structure and clarity.

class AuthService{
    //registering a new user
        // @param {Object} userData - User registration data
        // @returns {Promise<Object>} - User and JWtoken (mp)
        static async register(userData) {
            const { name, password, role, phone } = userData; //destructuring userData object

            //hash passwrod before saving it.
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            //create user
            const user = await User.create({
                name,
                password: hashedPassword,
                role,
                phone
            })    //here User is a mongoose model
            //create is a mongoose method to create and save a new document in the database after applying schema validations.

            //generate JWT token
            const token = this.generateToken(user);

            const userResponse = this.getSafeUserData(user);
            return { user: userResponse, token };
        }

    /*
   * Login user
   * @param {String} phone - User email
   * @param {String} password - User password
   * @returns {Promise<Object>} - User and token
   */

    static async login(phone,password){ 
        //Find user with password - normally password is not selected due to select: false in schema
        //but for login we need it to verify against provided password
        const user = await User.findOne({phone}).select('+password');
        if(!user){
            throw new ErrorResponse('Invalid credentials', 401);
        }

        //Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            throw new ErrorResponse('Invalid credentials', 401);
        }

        //update last login
        user.lastLogin = Date.now();
        await user.save({validateBeforeSave: false});

        //generate JWT token
        const token = this.generateToken(user);
        const userResponse = this.getSafeUserData(user);
        return {user: userResponse, token};
    }

    /*
    * Generate JWT token for user
    * @param {Object} user - User object
    * @returns {String} - JWT token
    */

    static generateToken(user){
        return jwt.sign(
            {
                id : user._id,
                role : user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn : process.env.JWT_EXPIRE
            }
        );
    }

    /*
    Verify JWT token.
    @param {String} token - JWT token
    @returns {Object} - Decoded token payload
    */ 

    static verifyToken(token){
        return jwt.verify(token, process.env.JWT_SECRET);
    }

    /*
    Get safe user data without sensitive info
    @param {Object} user - User object from DB
    @returns {Object} - Safe user data
    */
   static getSafeUserData(user){
    return {
        id : user._id,
        name : user.name,
        
        role : user.role,
        phone : user.phone,
        profileImage : user.profileImage,
        lastLogin : user.lastLogin,
    };
   }

   /*
   Get user by ID
    @param {String} id - User ID
    @returns {Object} - User object
   */
    static async getUserById(id){
        const user = await User.findById(id);
        if(!user){
            throw new ErrorResponse('User not found', 404);
        }
        return this.getSafeUserData(user);
    }

    //If the JWT is valid but the user no longer exists in the database (deleted or somehow logged out} -> but the JWT key hasn't yet expired, so we do a firced log out.
    static async validateIfExists(userId){
        if(!userId) return null;

        const user = await User.findById(userId);
    
        if (!user) {
            return null;     
        }
        return this.getSafeUserData(user);
        }

    //change password()
    static async changePassword(userId, oldPassword,newPassword){
        const user = await User.findById(userId).select('+password');
        if(!user){
            throw new ErrorResponse('User not found',404);
        }

        const isMatch = await bcrypt.compare(oldPassword,user.password);
        if(!isMatch){
            throw new ErrorResponse('Incorrect original password',401);
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword,salt);

        await user.save();
        //not findBYIdandUpdate as save runs all the validation checks.

        return {message: 'Password changed successfully'};

    }

    //delete user()
    static async deleteUser(userId){
        const user = await User.findByIdAndDelete(userId);
        if(!user){
            throw new ErrorResponse('User not found', 404);
        }
        return {message : `User ${user.name} has been successfully deleted`};
    }
    // getAllSupervisors() -> {suggestion taken} as the contractor would need to know about all the supervisors to assign them any work.
    static async getAllSupervisors(){

        //I have to get all the users with the role as supervisors, in an array , if that array is empty, then return an errroResponse, otherwise return the found supervisors, randomly.

        const allSupervisors = await User.find({role:'Supervisor'});  //find in mongoose takes in a query object with the condition for searching the documents.

        if(allSupervisors.length===0) throw new ErrorResponse('no supervisor found',404);   //length is a property in js not a method/function => no ()
        return allSupervisors.map(u => this.getSafeUserData(u));
    }
    }

export default AuthService;
