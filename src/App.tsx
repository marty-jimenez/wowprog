import { FormEvent, useCallback, useState } from 'react';
// import logo from './logo.svg';
import { TextField, Button, Grid } from '@mui/material';

import './App.css';
// import { getAccessToken, getCharacterProfile, getRealm, getWowToken } from './apiRequest';
import { getAccessToken, getWowToken } from './apiRequest';
function App() {
  const [ auth, setAuth ] = useState({client_id: "", client_secret: ""})
  const [ token, setToken ] = useState('')

  const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const token = await getAccessToken(auth.client_id, auth.client_secret)
    token.includes('failed') ? setToken('') : setToken("Bearer " + token)
    setAuth({client_id: "", client_secret: ""})
  }, [auth])

 /* TODO: 
  add light and dark mode
    add Main to components folder
    move this logic to Main or something like Login
  add error shaking
  add title
  add next page
  make a custom form component page to submit things like client_id, client_secret, realmSlug, characterName
 */
  return (
    <>
      <Grid container className="App">
        <Grid item xs={12}>
          <p>Title</p>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <Grid className='Grid-item' item xs={12}>
              <TextField
                id="client-id"
                label="Client ID"
                variant="filled"
                size="small"
                type='text'
                required
                value={auth.client_id}
                onChange={(event) => setAuth((prevObject) => ({
                  ...prevObject,
                  client_id: event.target.value,
                }))}
              />
            </Grid>
            <Grid className='Grid-item' item xs={12}>
              <TextField
                id="client-secret"
                label="Client Secret"
                variant="filled"
                required
                type='text'
                value={auth.client_secret}
                onChange={(event) => setAuth((prevObject) => ({
                  ...prevObject,
                  client_secret: event.target.value,
                }))}
              />
            </Grid>
            <Grid className='Grid-item' item xs={12}>
              <Button 
                variant='contained'
                disabled={!auth.client_id || !auth.client_secret} 
                type="submit" 
              >
                Submit
              </Button>
            </Grid>
          </form>
        </Grid>
          {/* <Button variant='contained' onClick={async () => getWowToken()}>getWowToken</Button>
          <Button variant='contained' onClick={async () => getRealm('stormrage')}>getRealm</Button>
          <Button variant='contained' onClick={async () => getCharacterProfile()}>getCharacterProfile</Button> */}      
        {token && 
          <Button variant='contained' onClick={async () => await getWowToken(token)}>wow token price</Button>
        }
      </Grid>

    </>
  );
}

export default App;
