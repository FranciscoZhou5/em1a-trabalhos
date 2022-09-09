import { useState, FormEvent, useEffect } from "react";
import { GetStaticProps, NextPage } from "next";

import { supabase } from "../../lib/supabase";

import { Task } from "../../types/Task";

import { TbPlus } from "react-icons/tb";
import Head from "next/head";
import Modal from "../../components/pages/Activities/Modal";

interface Props {
  count: number;
}

const ActivitiesPage: NextPage<Props> = ({ count }) => {
  const [openModal, setOpenModal] = useState(false);

  const [tasks, setTasks] = useState<Task[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState<Task["type"]>("task");

  const [error, setError] = useState<string | null>("");

  useEffect(() => {
    async function fetchTasks() {
      const { data } = await supabase.from<Task>("tasks").select("*");

      setTasks(data as Task[]);
    }

    fetchTasks();
  }, [error]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const dateStr = date.replaceAll("-", "");

    const year = +dateStr.substring(0, 4);
    const month = +dateStr.substring(4, 6);
    const day = +dateStr.substring(6, 8);

    const { error } = await supabase
      .from<Task>("tasks")
      .insert([{ description, title, type, due: new Date(year, month - 1, day).toLocaleDateString("en-US") }]);

    if (error === null) {
      setOpenModal(false);
      setError(null);
    }
  }

  return (
    <main>
      <Head>
        <title> Atividades </title>
      </Head>

      <Modal isOpen={openModal} closeModal={() => setOpenModal(false)}>
        <form
          onSubmit={handleSubmit}
          onClick={(e) => e.stopPropagation()}
          className="bg-black border border-gray100 rounded-md max-w-xs w-11/12 md:max-w-sm pb-3"
        >
          <div className="px-4 py-3 border-b border-gray100">
            <h3> Criar uma {{ task: "Atividade", test: "Prova" }[type]} </h3>
          </div>

          <div className="px-4 py-2">
            <div className="flex flex-col mb-4">
              <label htmlFor="title">
                <span> Título </span>
                <span className="text-red"> * </span>
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                required
                name="title"
                className="bg-transparent outline-none border border-gray100 rounded-md px-1 py-1 text-white placeholder:text-weak"
                placeholder="Seu título"
              />
            </div>

            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-col">
                <label htmlFor="date">
                  <span> Data </span>
                  <span className="text-red"> * </span>
                </label>
                <input
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  name="date"
                  type="date"
                  className="bg-transparent outline-none border border-gray100 rounded-md px-2 py-1 text-white"
                />
              </div>

              <div className="mx-1"></div>

              <div className="flex flex-col w-full md:w-auto">
                <label htmlFor="type">
                  <span> Tipo</span>
                  <span className="text-red"> * </span>
                </label>
                <select
                  value={type}
                  //@ts-ignore
                  onChange={(e) => setType(e.target.value)}
                  name="type"
                  className="text-white bg-transparent outline-none border border-gray100 rounded-md px-1 py-1"
                >
                  <option value="test" className="text-white bg-black">
                    Prova
                  </option>
                  <option value="task" className="text-white bg-black">
                    Atividade
                  </option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="description">
                <span> Descrição </span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name="description"
                placeholder="Escreva aqui"
                className="text-sm placeholder:text-weak border border-gray100 rounded-md bg-black outline-none text-white py-1 w-full resize-none"
              ></textarea>
            </div>
          </div>

          <div className="w-full px-4 flex justify-center items-center">
            <button className="bg-white text-black font-bold rounded-md px-4 py-1 hover:opacity-60 duration-200">
              Publicar
            </button>
          </div>
        </form>
      </Modal>

      <div className="w-full flex flex-col items-center px-4 py-3 md:px-8 md:py-4 lg:py-6 lg:px-16">
        <div className="w-full flex flex-col justify-center md:max-w-sm xl:max-w-xl">
          <div className="w-full flex justify-between items-center pb-6 mb-2 border-b border-gray100">
            <button
              onClick={() => setOpenModal(true)}
              className="flex items-center justify-center bg-white py-1 w-24 pr-2 rounded-md"
            >
              <TbPlus size={24} className="text-black" />
              <div className="ml-1 text-black">
                <strong> Criar </strong>
              </div>
            </button>
            <div>
              <p> Total: {count}</p>
            </div>
          </div>

          <div>
            {tasks?.map(({ id, title }) => (
              <div key={id}>
                <div> {title} </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { count } = await supabase.from<Task>("tasks").select("*", { count: "exact" });

  return {
    props: {
      count,
    },
  };
};

export default ActivitiesPage;
