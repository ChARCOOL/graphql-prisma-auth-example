import { request } from 'graphql-request'

import { RENEW_ACCESS_TOKEN } from './queries'

const renew_access_token = async (token: string) => {
  const {
    renewAccessToken: { accessToken },
  }: { renewAccessToken: { accessToken: string } } = await request(
    process.env.REACT_APP_API_SERVER!,
    RENEW_ACCESS_TOKEN,
    {
      token,
    },
  )

  return accessToken
}

export default renew_access_token
