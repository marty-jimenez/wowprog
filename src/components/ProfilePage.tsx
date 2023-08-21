import { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
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

const ProfilePage = ({ token }: ProfilePageProps) => {
  const [characterProfile, setCharacterProfile] =
    useState<CharacterProfile | null>(null);
  const [characterMedia, setCharacterMedia] = useState<CharacterMedia | null>(
    null
  );
  const [characterEquipment, setCharacterEquipment] = useState(null);
  const [characterRaids, setCharacterRaids] = useState<{
    [key: string]: InstanceMode[];
  }>({});
  const [expandedRaid, setExpandedRaid] = useState<string | null>(null);

  const toggleExpand = (name: string) => {
    if (expandedRaid === name) {
      setExpandedRaid(null);
    } else {
      setExpandedRaid(name);
    }
  };

  useEffect(() => {
    const raids = localStorage.getItem('characterRaids');
    const media = localStorage.getItem('characterMedia');
    const profile = localStorage.getItem('characterProfile');
    const equipment = localStorage.getItem('characterEquipment');
    if (raids && media && profile && equipment) {
      setCharacterEquipment(JSON.parse(equipment));
      setCharacterProfile(JSON.parse(profile));
      setCharacterMedia(JSON.parse(media));
      setCharacterRaids(parseRaids(JSON.parse(raids)));
    }
  }, [token]);

  /* TODO:
        1. lazy loading
          1.1 hash this out more, only have circular loading for table
        2. raid progression list, maybe a table with pagination for each raid done starting at most recent
          2.1 make table its own seperate custom component
        3. layout for profile
   */
  return (
    <Grid container spacing={4} sx={{ p: 2 }}>
      {characterRaids ? (
        <Grid item xs={5}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Raid</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Difficulty</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Completion</strong>
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(characterRaids).map(([name, modes]) => (
                  <>
                    <TableRow>
                      <TableCell>{name}</TableCell>
                      <TableCell>
                        {characterRaids[name][0].difficulty.type}
                      </TableCell>
                      <TableCell>
                        {characterRaids[name][0].progress.completed_count +
                          '/' +
                          characterRaids[name][0].progress.total_count}
                      </TableCell>
                      <TableCell size="small">
                        {characterRaids[name].length > 1 && (
                          <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => toggleExpand(name)}
                          >
                            {expandedRaid === name ? (
                              <KeyboardArrowUpIcon />
                            ) : (
                              <KeyboardArrowDownIcon />
                            )}
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                    {expandedRaid === name && (
                      <TableRow>
                        <TableCell colSpan={4}>
                          <TableContainer>
                            <Table>
                              <TableBody>
                                {modes.map((instance) => (
                                  <TableRow
                                    key={instance.difficulty.type + ' ' + name}
                                  >
                                    <TableCell />
                                    <TableCell>
                                      {instance.difficulty.type}
                                    </TableCell>
                                    <TableCell>
                                      {instance.progress.completed_count +
                                        '/' +
                                        instance.progress.total_count}
                                    </TableCell>
                                    <TableCell />
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      ) : (
        // TODO: hash this out more
        <CircularProgress />
      )}
      {characterMedia && characterProfile && (
        <Grid item xs={4} style={{ textAlign: 'center' }}>
          <>
            <Typography variant="h4" sx={{ fontFamily: 'Arial Narrow Bold' }}>
              {`${characterProfile.name} ${characterProfile.average_item_level}`}
            </Typography>
            <img
              style={{
                width: '100%',

                backgroundColor: 'pink'
              }}
              src={characterMedia.assets[2].value}
            />
          </>
        </Grid>
      )}
    </Grid>
  );
};

export default ProfilePage;
