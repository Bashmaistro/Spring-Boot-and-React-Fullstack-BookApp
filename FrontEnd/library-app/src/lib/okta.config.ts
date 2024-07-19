export const oktaConfig = 
{
    clientId: '0oaifufl6pE5g4GaT5d7',
    issuer:'https://dev-75937530.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid' , 'profile' , 'email'],
    pkce: true,
    disableHttpCheck: true,
}