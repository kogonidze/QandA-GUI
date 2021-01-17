export const server = 'https://localhost:44381';

export const webAPIUrl = `${server}/api`;

export const authSettings = {
  domain: 'kogonidze.eu.auth0.com',
  client_id: 'QC5igFx66RbyhiHT1Z12OFUIPfi0CaxT',
  redirect_uri: window.location.origin + '/signin-callback',
  scope: 'openid profile QandAAPI email',
  audience: 'https://qanda',
};
