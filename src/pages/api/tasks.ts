import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabase";
import { Task } from "../../types/Task";

interface Data {
  data: Task[] | null;
  count: number | null;
}

export default async function handle(req: NextApiRequest, res: NextApiResponse<(Task[] | null) | Data>) {
  // if (req.method === 'POST') {
  //   const { username, password } = req.body;

  //   const { error, data } = await supabase
  //     .from<Task>("tasks")
  //     .insert([{ description: `${username} ${password}`, title: 'aa', type: 'test', due: "09/09/2022" }]);

  //   return res.status(200).json({ error, data } as unknown as Task[])
  // }
  const { data, count } = await supabase.from<Task>("tasks").select("*", { count: "exact" });

  if (Object.keys(req.query).includes("count")) {
    return res.status(200).send({
      data,
      count,
    });
  }

  return res.status(200).send(data);
}
