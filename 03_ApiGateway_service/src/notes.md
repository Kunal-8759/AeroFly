# for the signup process
1. just get the data:{email:unique,password}
2. encrypt the password in the models folder using bcrypt.hashSync(user.password,+SALT_ROUNDS)

# for the signin process
1. get the data from the user   data:{email,password}
2. add a middleware to authenticate the user so that the email and password field cant be empty
3. find the user on the basis of email
4. check the password of the (data.password,user.password) since the user.password is encrypted
    we will use bcrypt.compreSync(plainPassword,encryptedPassword) 
5.  if password is matched then will create the jwt token and return the jwt token to the user
6. 

# Authentication while fetching api
1. added a middleWare isAuthenticated before the controller of the api
2. we will verify the token using jwt.verify(token,JWT_SECRET) it returns {id,email}
3. will fetch the user from the id (because there might be chance the user is deleted the profile and then try to login using that token)
4.  and we will set the req.user=id for the authentication of api and then call next() to call the controller 



# how to add the role to the user
1. Added a role table
2. since user can be customer as well as admin, also in  admin there is many user
    - there is many-to-many relation between the user and the role
    - for that we have to add another table user_role table to show many-to-many assoc

3. when user will signup , bydefault we give then customer role
4. to change the role or add role the user -->lets say we have to add admin to a user
    - we just can appoint admin by passing the api
    - the another admin must signed in and approve the user to get a new role
    - user must be signedUp
    - the admin must be signedUp

    - Admin should signed in and create theie token and in the req.headers they pass the 
        valid token along with the in the body pass the id of the user and role to which we have to appoint them in the api localhost:3001/api/v1/user/role POST

    - what internally goes on 

        1. there is a middleware CheckAuth , they check the whichever pass the token is valid user or not , after all they they set req.user= id of the user having the token passed
        (in our case it will be ADMIN)

        2. there is second middleware isAdmin , they check req.user is admin or not
            if yes then it goes to the controller
            
        3. In the req.body there is id of the user passed and role to which it will get appointed , will do if all goes good

        # summary :
        In the req.headers pass the token of the admin
        In the req.body pass the user id amd role to which they get appointed    
