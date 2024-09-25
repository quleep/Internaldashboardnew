// module.exports=  {
//     getUser: function(){
//         const user= sessionStorage.getItem('user')
//         if(user === undefined || !user){
//             return null
//         }else{
//            return JSON.parse(user)
//         }
//     },

//     getToken: function(){
//         return sessionStorage.getItem('token')
//     },
//     setUserSession: function(user, token, name){
//         sessionStorage.setItem('user', JSON.stringify(user))
//         sessionStorage.setItem('token', token)
//         sessionStorage.setItem('username', JSON.stringify(name))
        
//     },
//      resetUserSession: function(){
   
//      }

// }

// AuthService.jsx

export const getUser = () => {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export const getToken = () => {
    return sessionStorage.getItem('token');
};

export const setUserSession = (user, token, name) => {
    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('username', JSON.stringify(name));
};

export const resetUserSession = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
};
