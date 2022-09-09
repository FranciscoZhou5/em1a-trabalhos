import Link from "next/link";
import { Task } from "../../../types/Task";

import { BiBookContent } from "react-icons/bi";
import { HiOutlineNewspaper } from "react-icons/hi";

function TaskIcon({ type }: { type: Task["type"] }) {
  const handler = {
    test: <HiOutlineNewspaper className="w-6 h-6 mr-2" />,
    task: <BiBookContent className="w-6 h-6 mr-2" />,
  };

  return handler[type];
}

interface Props {
  tasks: Task[];
}

export default function TasksList({ tasks }: Props) {
  return (
    <div className="w-full">
      <div className="w-full lg:pr-4 first:mt-0">
        {tasks.length === 0 ? (
          <div className="h-14 flex justify-center items-center rounded-md border-gray100 border text-weak">
            <p>Parece que não temos mais nada</p>
          </div>
        ) : (
          tasks?.map(({ id, title, due, type, owner, description }) => (
            <Link key={id} href={`/app/task/${id}`}>
              <div className="mb-4 bg-black border-gray100 border rounded-md cursor-pointer flex flex-col duration-200 hover:border-white">
                <div className="flex items-center px-3 py-4 border-b border-gray100">
                  <div>
                    <TaskIcon type={type} />
                  </div>

                  <div className="flex flex-col md:items-center md:flex-row">
                    <strong className="text-base text-gradient"> {title} </strong>
                    <p className="md:ml-2">
                      adicionado por <span className="text-white"> {owner} </span>
                    </p>
                  </div>
                </div>

                <div className="px-3 pb-3">
                  <p className="py-3 px-4"> {description.length === 0 ? "Sem descrição" : description} </p>

                  <p>
                    Para <span> {new Date(due).toLocaleDateString("pt-BR", { dateStyle: "medium" })} </span>
                  </p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
