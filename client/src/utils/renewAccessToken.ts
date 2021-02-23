import { request } from 'graphql-request'

import { RENEW_ACCESS_TOKEN } from './queries'

type AccessToken = { renewAccessToken: { accessToken: string } }

const renewAccessToken = async (token: string) => {
  const {
    renewAccessToken: { accessToken },
  }: AccessToken = await request(
    process.env.REACT_APP_API_SERVER!,
    RENEW_ACCESS_TOKEN,
    {
      token,
    },
  )

  return accessToken
}

export default renewAccessToken
