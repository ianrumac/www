import fetch from 'node-fetch';

export async function getApiKey(username: string): Promise<string> {
  const res = await fetch(`${process.env.SHUTTLE_API_BASE_URL}/users/${username}`, {
    method: 'POST'
  })

  if (res.ok) {
    return res.text()
  } else {
    throw new Error('could not get api key.')
  }
}
