import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(req: NextApiRequest, res: NextApiResponse<string>) {
  return res.status(200).send("Hello world!");
}
