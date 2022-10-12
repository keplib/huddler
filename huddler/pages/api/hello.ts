// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const ress = await fetch("https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/newuser", {
    method: 'POST',
    credentials: 'include',
    mode: "no-cors",
    body: req.body.newUser,
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }
  });

  const data = await ress.json()

  console.log('hi',data);




}
