import jwt from 'jsonwebtoken';

export async function middleware(req) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');

  try {
    const payload = jwt.verify(token, process.env.SECRET_TOKEN);
  } catch (e) {
    new Response('Access denied');
  }
}
