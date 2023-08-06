import { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import style from '../globalStyles/GlobalStyles.module.css';
import { CharacterMedia, CharacterProfile } from './SharedInterfaces';
interface ProfilePageProps {
  token: string;
}
const ProfilePage = ({ token }: ProfilePageProps) => {
  const [characterProfile, setCharacterProfile] =
    useState<CharacterProfile | null>(null);
  const [characterMedia, setCharacterMedia] = useState<CharacterMedia | null>(
    null
  );
  const [characterEquipment, setCharacterEquipment] = useState(null);
  const [characterRaids, setCharacterRaids] = useState(null);

  useEffect(() => {
    const characterRaids = localStorage.getItem('characterRaids');
    const characterMedia = localStorage.getItem('characterMedia');
    const characterProfile = localStorage.getItem('characterProfile');
    const characterEquipment = localStorage.getItem('characterEquipment');
    if (
      characterRaids &&
      characterMedia &&
      characterProfile &&
      characterEquipment
    ) {
      setCharacterEquipment(JSON.parse(characterEquipment));
      setCharacterProfile(JSON.parse(characterProfile));
      setCharacterMedia(JSON.parse(characterMedia));
      setCharacterRaids(JSON.parse(characterRaids));
    }
  }, [token]);
  // TODO: include lazy loading
  /*   TODO:
   */
  return (
    <Grid container className={style.gridContainer}>
      <Grid item xs={4}>
        {characterMedia && characterProfile && (
          <>
            <Typography
              variant="h4"
              component="p"
              sx={{ fontFamily: 'Arial Narrow Bold' }}
            >
              {`${characterProfile.name} ${characterProfile.average_item_level}`}
            </Typography>
            <img
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'pink'
              }}
              src={characterMedia.assets[2].value}
            />
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
