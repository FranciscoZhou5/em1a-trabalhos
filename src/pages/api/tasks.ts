import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from '../../lib/supabase';
import { Task } from "../../types/Task";

export default async function handle(req: NextApiRequest, res: NextApiResponse<Task[]>) {
  if (req.method === 'POST') {   
    const { error, data } = await supabase
      .from<Task>("tasks")
      .insert([{ description: JSON.stringify(req.body), title: 'aa', type: 'test', due: 'asdasdasd' }]);
    
    
    return res.status(200).json({ error, data })
  }
  
   const { data, count } = await supabase.from<Task>("tasks").select("*", { count: "exact" });
  
  return res.status(200).send(data as Task[]);
}
