import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from '../../lib/supabase';

export default async function handle(req: NextApiRequest, res: NextApiResponse<string>) {
  if (req.method === 'POST') {
    return res.status(200).send("post success!")
  }
  
  return res.status(200).send("Hello world!");
}
