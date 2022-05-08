
import {useState, useEffect} from 'react'
import {GoogleLogin, GoogleLogout} from 'react-google-login'
import DatabaseService from './DatabaseService';

const clientId = '144917246358-2cq17d3sf233b3rj9p5dluack482s1tb.apps.googleusercontent.com'


export type _user = {
  id: Number,
  name: String,
  email: String;
}


export default function Login() { 
  const [showloginButton, setShowloginButton]  = useState(true);
  const [showlogoutButton, setShowlogoutButton]  = useState(false);
  const [users, setUsers] = useState<_user[]>([]);

  useEffect(() => {
    getUsers()
  }, []) 
  const onLoginFailure = (res: any) => {
    console.log('[Login failed] res:', res);
  };

  const onLogoutSuccess = () => {
    alert('Logout made successfull: userid:') ;
    console.clear();
    setShowloginButton(true);
    setShowlogoutButton(false);
    
    
  }

  async function getUsers() {
    let allUsers = await DatabaseService.getUsers();
    setUsers(allUsers);
    console.log('all users', allUsers)
    console.log(' users', users)
  }

  async function getUser(id: Number) {
    return await DatabaseService.getUser(id);
  }

  const onLoginSuccess = async (res: any ) => {

    console.log('[Login Success] currentUser:', res.profileObj);
    console.log("user content created!", res.profileObj.email)
    setShowloginButton(false);
    setShowlogoutButton(true);
    let isUser= false;
    console.log(users)
    users.forEach(u => {
      console.log(u)
        if(res.profileObj.email === u.email ){
          console.log(u.email + " is an user")
          isUser = true;
        }
    }) 
    if(!isUser){
        console.log(`${res.profileOb.email} is not user`)
    }

};

return (
    <div>
      { showloginButton ?
        <GoogleLogin
          clientId={clientId}
          buttonText="Sing in"
          onSuccess={onLoginSuccess}
          onFailure={onLoginFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
        /> : null }
      
      { showlogoutButton ?
        <GoogleLogout
          clientId={clientId}
          buttonText="Logout"
          onLogoutSuccess={onLogoutSuccess}
      /> : null }
    </div>
  );
}

