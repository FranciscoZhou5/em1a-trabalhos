import { BiBookContent } from "react-icons/bi";
import { RiFilePaperFill } from "react-icons/ri";

export function taskIconHandler(type: "test" | "task") {
  const handler = {
    test: <RiFilePaperFill className="w-6 h-6" />,
    task: <BiBookContent className="w-6 h-6" />,
  };

  return handler[type];
}
