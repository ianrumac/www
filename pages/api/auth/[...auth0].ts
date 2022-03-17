import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { getApiKey } from '../../../lib/shuttle-api';

async function afterCallback  (req, res, session, state) {
  try {
    session.user.api_key = await getApiKey(session.user.sub.replace('|', '-'));
  } catch (err) {
    console.error(err)
  }

  return session;
};

export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res, { afterCallback });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  }
});
