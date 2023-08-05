import { useState, FormEvent } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { getCharacterProfile } from '../apiRequest';
import style from '../globalStyles/GlobalStyles.module.css';
interface ProfileProps {
  token: string;
}

const ProfilePage = ({ token }: ProfileProps) => {
  const [profileData, setProfileData] = useState({});
  const [formInput, setFormInput] = useState({ realm: '', name: '' });

  const handleCharacterProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await getCharacterProfile(
      token,
      formInput.realm,
      formInput.name
    );
    typeof response != 'object' ? setProfileData([]) : setProfileData(response);
  };
  return (
    <Grid container className={style.gridContainer}>
      <Grid item xs={12}>
        <Typography variant="body2" color="textSecondary" component="p">
          Access Character Info
        </Typography>
        <form
          autoComplete="on"
          onSubmit={(event) => {
            handleCharacterProfile(event);
          }}
        >
          <Grid className={style.gridItem} item xs={12}>
            <TextField
              id="character-name"
              label="Character Name"
              variant="filled"
              size="small"
              type="text"
              required
              value={formInput.name}
              onChange={(event) =>
                setFormInput((prevObject) => ({
                  ...prevObject,
                  name: event.target.value
                }))
              }
            />
          </Grid>
          <Grid className={style.gridItem} item xs={12}>
            <TextField
              id="realm"
              label="Character Realm"
              variant="filled"
              required
              type="text"
              value={formInput.realm}
              onChange={(event) =>
                setFormInput((prevObject) => ({
                  ...prevObject,
                  realm: event.target.value
                }))
              }
            />
          </Grid>
          <Grid className={style.gridItem} item xs={12}>
            <Button
              variant="contained"
              disabled={!formInput.name || !formInput.realm}
              type="submit"
            >
              SUBMIT
            </Button>
          </Grid>
        </form>
      </Grid>
      <Grid item xs={6} sx={{ wordBreak: 'break-all' }}>
        {JSON.stringify(profileData)}
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
