import axios from 'axios';

export const getAccessToken = async (
  clientID: string,
  clientSecret: string
) => {
  const formData = new FormData();
  formData.append('grant_type', 'client_credentials');
  try {
    const { data } = await axios.request({
      auth: {
        username: clientID,
        password: clientSecret
      },
      method: 'post',
      url: 'https://oauth.battle.net/token',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data.access_token;
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Request failed with unknown error.';
    return message;
  }
};

export const getWowToken = async (token: string) => {
  const { data } = await axios.request({
    method: 'get',
    url: 'https://us.api.blizzard.com/data/wow/token/?namespace=dynamic-us',
    headers: { Authorization: token }
  });
  console.log(data);
  return data;
};

// export const getRealm = async (realmSlug: string) => {
//     const { data } = await axios.request({
//         method: "get",
//         url: `https://us.api.blizzard.com/data/wow/realm/${realmSlug.toLowerCase()}?namespace=dynamic-us`,
//         headers: { "Authorization":  accessToken},
//       })
//     console.log(data)
//     return data
// }

// export const getCharacterProfile = async () => {
//     const { data } = await axios.request({
//         method: "get",
//         url: "https://us.api.blizzard.com/profile/wow/character/stormrage/alldeez?namespace=profile-us",
//         headers: { "Authorization":  accessToken},
//       })
//     console.log(data)
//     return data
// }
