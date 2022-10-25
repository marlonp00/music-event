import cookie from 'cookie'
import {API_URL} from '@/config/index'

export default async (req, res) => {
  if(req.method === "POST") {
    const {identifier, password} = req.body;

    // Comes from Strapi
    const strapiRes = await fetch(`${API_URL}/api/auth/local`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({identifier, password})
    });

    const data = await strapiRes.json();

    if(strapiRes.ok) {
        // Set cookie
        res.setHeader('Set-Cookie', cookie.serialize('token', data.jwt, { 
          httpOnly: true, 
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 60 * 60 * 24 * 7, // 1 Week
          sameSite: 'strict',
          path: '/'
        }))
        res.status(200).json({user: data.user});
    } else {
      console.log(data)
      res.status(data.error.status).json({message: data.error.message});
    }
  } else {
    // NODE JS Methods
    res.setHeader('Allow', ['POST'])
    res.status(405).json({message: `method: ${req.method} not allowed`})
  }

} 