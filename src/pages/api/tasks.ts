import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from '../../lib/supabase';

export default async function handle(req: NextApiRequest, res: NextApiResponse<string>) {
  if (req.method === 'POST') {
    const { data } = await supabase.from("tasks").select("*");
    
    return res.status(200).json(data)
  }
  
  return res.status(200).send("Hello world!");
}
