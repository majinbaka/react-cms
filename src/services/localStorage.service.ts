import { Config } from '@app/config/cms.config';
import { UserModel } from '@app/domain/UserModel';
const avatarImg = process.env.REACT_APP_ASSETS_BUCKET + '/avatars/avatar5.webp';

const testUser = {
  id: 1,
  firstName: 'Chris',
  lastName: 'Johnson',
  imgUrl: avatarImg,
  userName: '@john1989',
  email: {
    name: 'chris.johnson@altence.com',
    verified: true,
  },
  phone: {
    number: '+18143519459',
    verified: true,
  },
  sex: 'male',
  birthday: '01/26/2022',
  lang: 'en',
  country: 'GB',
  city: 'London',
  address1: '14 London Road',
  zipcode: 5211,
  website: 'altence.com',
  socials: {
    twitter: '@altence_team',
    facebook: 'https://facebook.com/groups/1076577369582221',
    linkedin: 'https://linkedin.com/company/altence',
  },
};

export const persistToken = (token: string): void => {
  Config.storageDefaut.setItem('accessToken', token);
};

export const readToken = (): string => {
  return Config.storageDefaut.getItem('accessToken') || 'bearerToken';
};

export const persistRefreshToken = (token: string): void => {
  Config.storageDefaut.setItem('refreshToken', token);
};

export const readRefreshToken = (): string => {
  return Config.storageDefaut.getItem('refreshToken') || '';
};

export const persistUser = (user: UserModel): void => {
  Config.storageDefaut.setItem('user', JSON.stringify(user));
};

export const readUser = (): UserModel | null => {
  const userStr = Config.storageDefaut.getItem('user');

  return userStr ? JSON.parse(userStr) : testUser;
};

export const deleteRefreshToken = (): void => Config.storageDefaut.removeItem('refreshToken');
export const deleteToken = (): void => Config.storageDefaut.removeItem('accessToken');
export const deleteUser = (): void => Config.storageDefaut.removeItem('user');
