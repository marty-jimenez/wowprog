import { useState, FormEvent } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import {
  getCharacterEquipment,
  getCharacterMedia,
  getCharacterProfile,
  getCharacterRaids
} from '../apiRequests/apiRequest';
import { useNavigate } from 'react-router-dom';
import style from '../globalStyles/GlobalStyles.module.css';
interface ProfileInputProps {
  token: string;
}

const ProfileInput = ({ token }: ProfileInputProps) => {
  const navigate = useNavigate();
  const [formInput, setFormInput] = useState({ realm: '', name: '' });

  const handleProfileSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const [raids, media, profile, equipment] = await Promise.all([
      getCharacterRaids(token, formInput.realm, formInput.name),
      getCharacterMedia(token, formInput.realm, formInput.name),
      getCharacterProfile(token, formInput.realm, formInput.name),
      getCharacterEquipment(token, formInput.realm, formInput.name)
    ]);
    if (
      Object.keys(raids).length > 0 &&
      Object.keys(media).length > 0 &&
      Object.keys(profile).length > 0 &&
      Object.keys(equipment).length > 0
    ) {
      localStorage.setItem('characterRaids', JSON.stringify(raids));
      localStorage.setItem('characterMedia', JSON.stringify(media));
      localStorage.setItem('characterProfile', JSON.stringify(profile));
      localStorage.setItem('characterEquipment', JSON.stringify(equipment));
      navigate(`/profile/${formInput.name}/${formInput.realm}`);
    }
  };

  return (
    <Grid container className={style.gridContainer} sx={{ height: '80dvh' }}>
      <Grid item xs={12}>
        <Typography variant="body2" color="textSecondary" component="p">
          Access Character Info
        </Typography>
        <form
          autoComplete="on"
          onSubmit={(event) => {
            handleProfileSubmit(event);
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
    </Grid>
  );
};

export default ProfileInput;
