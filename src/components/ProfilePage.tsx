import { useState, FormEvent } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { getCharacterMedia, getCharacterProfile } from '../apiRequest';
import style from '../globalStyles/GlobalStyles.module.css';
import { CharacterMedia } from './SharedInterfaces';
interface ProfileProps {
  token: string;
}

const ProfilePage = ({ token }: ProfileProps) => {
  const [characterProfile, setCharacterProfile] = useState({});
  const [characterMedia, setCharacterMedia] = useState<CharacterMedia>({});
  const [formInput, setFormInput] = useState({ realm: '', name: '' });

  const handleCharacterProfileAndMedia = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const profile = await getCharacterProfile(
      token,
      formInput.realm,
      formInput.name
    );

    const media: CharacterMedia = await getCharacterMedia(
      token,
      formInput.realm,
      formInput.name
    );

    typeof profile != 'object'
      ? setCharacterProfile({})
      : setCharacterProfile(profile);
    typeof media != 'object' ? setCharacterMedia({}) : setCharacterMedia(media);
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
            handleCharacterProfileAndMedia(event);
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
        {JSON.stringify(characterProfile)}
        {characterMedia.assets && characterMedia.assets.length === 3 && (
          <img
            style={{
              width: '100%',
              height: '100%'
            }}
            src={characterMedia.assets[2].value}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
