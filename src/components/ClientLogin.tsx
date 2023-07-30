import { FormEvent, useCallback, useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { getAccessToken } from '../apiRequest';

interface LoginProps {
  setToken: React.Dispatch<React.SetStateAction<string>>;
}
const ClientLogin = ({ setToken }: LoginProps) => {
  const [auth, setAuth] = useState({ client_id: '', client_secret: '' });

  /* TODO: 
    commit token to localstorage as well and check for expiration
    add error shaking
  */
  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const token = await getAccessToken(auth.client_id, auth.client_secret);
      token.includes('failed') ? setToken('') : setToken('Bearer ' + token);
      setAuth({ client_id: '', client_secret: '' });
    },
    [auth, setToken]
  );

  return (
    <Grid container className="App">
      <Grid item xs={12}>
        <Typography variant="body1" color="textSecondary" component="p">
          Log In
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Access Battle.net APIs
        </Typography>
        <form autoComplete="on" onSubmit={handleSubmit}>
          <Grid className="Grid-item" item xs={12}>
            <TextField
              id="client-id"
              label="Client ID"
              variant="filled"
              size="small"
              type="text"
              required
              value={auth.client_id}
              onChange={(event) =>
                setAuth((prevObject) => ({
                  ...prevObject,
                  client_id: event.target.value
                }))
              }
            />
          </Grid>
          <Grid className="Grid-item" item xs={12}>
            <TextField
              id="client-secret"
              label="Client Secret"
              variant="filled"
              required
              type="text"
              value={auth.client_secret}
              onChange={(event) =>
                setAuth((prevObject) => ({
                  ...prevObject,
                  client_secret: event.target.value
                }))
              }
            />
          </Grid>
          <Grid className="Grid-item" item xs={12}>
            <Button
              variant="contained"
              disabled={!auth.client_id || !auth.client_secret}
              type="submit"
            >
              LOGIN
            </Button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default ClientLogin;
