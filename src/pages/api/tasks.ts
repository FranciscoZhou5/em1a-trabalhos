import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from '../../lib/supabase';
import { Task } from "../../types/Task";

export default async function handle(req: NextApiRequest, res: NextApiResponse<Task[] | string>) {
  if (req.method === 'POST') {
    const { data } = await supabase.from<Task>("tasks").select("*");
    
    return res.status(200).json(req.body as Task[])
  }
  
  return res.status(200).send("Hello world!");
}
