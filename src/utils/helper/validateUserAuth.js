export const validateUserAuth=(user,values)=>{

    if(!user){
        return 'User not found'
    }
    if(user.email!==values.email){
        return 'Email is incorrect'
    }
    if(user.password!==values.password){
        return 'Password is incorrect'
    }
    if(!user.role){
        return 'role is not assignes'
    }

    if(!user.status){
        return  `${user?.name} is deactivate by the admin`
    }

    return null
}