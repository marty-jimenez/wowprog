import { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import style from '../globalStyles/GlobalStyles.module.css';
import {
  CharacterMedia,
  CharacterProfile,
  CharacterRaids,
  InstanceMode
} from './SharedInterfaces';
interface ProfilePageProps {
  token: string;
}

function parseRaids(raids: CharacterRaids) {
  const raidCompletion: { [key: string]: InstanceMode[] } = {};
  raids.expansions.forEach((expansion) => {
    expansion.instances.forEach((instance) => {
      raidCompletion[instance.instance.name] = instance.modes;
    });
  });
  return raidCompletion;
}
function renderModes(modes: InstanceMode): JSX.Element {
  return <div>{modes.difficulty.type}</div>;
}
function renderRaids(name: string, modes: InstanceMode[]): JSX.Element {
  console.log(name, modes);
  return (
    <div>
      {name}
      {modes.map(renderModes)}
    </div>
  );
}
const ProfilePage = ({ token }: ProfilePageProps) => {
  const [characterProfile, setCharacterProfile] =
    useState<CharacterProfile | null>(null);
  const [characterMedia, setCharacterMedia] = useState<CharacterMedia | null>(
    null
  );
  const [characterEquipment, setCharacterEquipment] = useState(null);
  // const [characterRaids, setCharacterRaids] = useState<CharacterRaids | null>(
  //   null
  // );
  const [characterRaids, setCharacterRaids] = useState<{
    [key: string]: InstanceMode[];
  }>({});

  useEffect(() => {
    const raids = localStorage.getItem('characterRaids');
    const media = localStorage.getItem('characterMedia');
    const profile = localStorage.getItem('characterProfile');
    const equipment = localStorage.getItem('characterEquipment');
    if (raids && media && profile && equipment) {
      setCharacterEquipment(JSON.parse(equipment));
      setCharacterProfile(JSON.parse(profile));
      setCharacterMedia(JSON.parse(media));
      // setCharacterRaids(JSON.parse(raids));
      setCharacterRaids(parseRaids(JSON.parse(raids)));
    }
  }, [token]);
  /* TODO:
        1. lazy loading
        2. raid progression list, maybe a table with pagination for each raid done starting at most recent
        3. layout for profile
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
      <Grid item xs={4}>
        {characterRaids &&
          Object.entries(characterRaids).map(([name, modes]) =>
            renderRaids(name, modes)
          )}
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
