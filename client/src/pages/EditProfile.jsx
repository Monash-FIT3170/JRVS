import React, { useEffect, useState } from 'react'
import { useApi } from '../context/ApiProvider';
import Grid from '@mui/material/Unstable_Grid2';
import MenuBar from '../components/MenuBar'
import DefaultButton from '../components/DefaultButton';
import "../index.css"


const EditProfile = () => {
  // Create the hooks for the different inputs
  const [user, setUser] = useState({ username: '', points: 0, level: 0 });
  const [isUserLoading, setIsUserLoading] = useState(true);

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [username, setUsername] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [email, setEmail] = useState('')
  const [school, setSchool] = useState('')
  // const [schools, setSchools] = useState('')
  const [password, setPassword] = useState('')

  // const location = useLocation();
  // const [avatarState, setAvatarState] = useState(location.state?.avatarState || 'blue')
  const {getData, postData} = useApi();

  // POST request to register user
  const handleSubmit = async () => {
      console.log("HELLLOOO");
      try {
        const res = await postData('api/users/updateDetails', {firstname, lastname, username, newUsername, email, school, password});
        console.log(res);
      } catch (error) {
        console.error('Updating use details failed', error);
      }
  };


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await postData('api/auth/current', {token});
        const userData = await getData(`api/users/id/${res.decoded.id}`);
        console.log(userData);
        setUser({ username: userData.username, 
          points: userData.points || 0, 
          level: userData.level || 0 });
        setFirstname(userData.firstname);
        setLastname(userData.lastname);
        setEmail(userData.email);
        setSchool(userData.school);
        setUsername(userData.username);
        setNewUsername(userData.username);
        // setAvatar({avatar: userData.avatar, border: userData.border, background: userData.background})
        setIsUserLoading(false);
      } catch (error) {
        console.log(error);
        setIsUserLoading(true);
      }
    };
    fetchUser();

  }, [getData, postData])



  return (
    <div className='App-page' style={{ height: '100vh' }}>
      <MenuBar /> 

      <Grid container spacing={2}>
          {/* Row 1 */}
        <Grid xs={2} ></Grid>
        <Grid xs={8}>
            <p className="text-5xl font-bold mb-12 text-center" style={{ color: 'white' }}>MY DETAILS</p>
        </Grid>
        <Grid xs={2}></Grid>

        {/* Row 2 */}
        <Grid xs={2} ></Grid>
        <Grid xs={8} style={{ 
            backgroundColor: 'white', 
            padding: '20px', 
            height: '100%',
            borderRadius: '20px' }}>
            
            {/* Form */}
            <form  id="detailsform" className="p-5 flex flex-col items-center justify-center " onSubmit={handleSubmit}>
                {/* Create the grid layout */}
                <div className="grid grid-cols-1 gap-6">
                    <div className="flex gap-2">
                        <label>
                            <span className="text-gray-700 mr">First name</span>
                            <input type='text' 
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            ></input>
                        </label>
                        <label>
                            <span className="text-gray-700">Last name</span>
                            <input type='text' 
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            onChange={(e) => setLastname(e.target.value)}
                            value={lastname}
                            ></input>
                        </label>
                    </div>   

                    <label className="block">
                        <span className="text-gray-700">Username</span>
                        <input type='text' 
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        onChange={(e) => setNewUsername(e.target.value)}
                        value={newUsername}
                        ></input>
                    </label>
                    
                    <label className="block">
                        <span className="text-gray-700">Email</span>
                        <input type="email" 
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
                        placeholder="john@example.com"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        ></input>
                    </label>

                    <label className="block">
                        <span className="text-gray-700">School</span>
                        <input type="text" 
                        className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        onChange={(e) => setSchool(e.target.value)}
                        value={school}
                        ></input>                    
                        {/* <Select options={schools} onChange={(e) => setSchool(e.value)}/> */}
                    </label>

                    <label className="block">
                        <span className="text-gray-700">Password</span>
                        <input type='password' 
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        onChange={(e)=> setPassword(e.target.value)}
                        value={password}
                        ></input>
                    </label>
                </div>
            </form>

        </Grid>
        <Grid xs={2} ></Grid>

        {/* Row 3 */}
        <Grid xs={2} ></Grid>
        <Grid xs={8} >
          <Grid container justifyContent="space-between">
            <Grid item xs={6} style={{ padding : '20px'}}>
              <DefaultButton href='/profile' text='Back to My Profile'/>
            </Grid>
            <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end', padding : '20px'}}>
              <button form="detailsform" class="default-button" type="submit">
                Update My Details
              </button> 
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={2} ></Grid>
      </Grid>
    </div>
      
  )
}



export default EditProfile