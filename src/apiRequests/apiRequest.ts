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
    return Promise.reject(message);
  }
};

export const getWowToken = async (token: string) => {
  try {
    const { data } = await axios.request({
      method: 'get',
      url: 'https://us.api.blizzard.com/data/wow/token/?namespace=dynamic-us',
      headers: { Authorization: token }
    });
    return data;
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Request failed with unknown error.';
    return Promise.reject(message);
  }
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

export const getCharacterProfile = async (
  token: string,
  realm: string,
  name: string
) => {
  try {
    const { data } = await axios.request({
      method: 'get',
      url: `https://us.api.blizzard.com/profile/wow/character/${realm.toLowerCase()}/${name.toLowerCase()}?namespace=profile-us`,
      headers: { Authorization: token }
    });
    return data;
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Error\nRequest failed with unknown error.';
    return Promise.reject(message);
  }
};

export const getCharacterMedia = async (
  token: string,
  realm: string,
  name: string
) => {
  try {
    const { data } = await axios.request({
      method: 'get',
      url: `https://us.api.blizzard.com/profile/wow/character/${realm.toLowerCase()}/${name.toLowerCase()}/character-media?namespace=profile-us`,
      headers: { Authorization: token }
    });
    return data;
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Request failed with unknown error.';
    return Promise.reject(message);
  }
};

export const getCharacterEquipment = async (
  token: string,
  realm: string,
  name: string
) => {
  try {
    const { data } = await axios.request({
      method: 'get',
      url: `https://us.api.blizzard.com/profile/wow/character/${realm.toLowerCase()}/${name.toLowerCase()}/equipment?namespace=profile-us`,
      headers: { Authorization: token }
    });
    return data;
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Request failed with unknown error.';
    return Promise.reject(message);
  }
};

export const getCharacterRaids = async (
  token: string,
  realm: string,
  name: string
) => {
  try {
    const { data } = await axios.request({
      method: 'get',
      url: `https://us.api.blizzard.com/profile/wow/character/${realm.toLowerCase()}/${name.toLowerCase()}/encounters/raids?namespace=profile-us`,
      headers: { Authorization: token }
    });
    return data;
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Request failed with unknown error.';
    return Promise.reject(message);
  }
};
