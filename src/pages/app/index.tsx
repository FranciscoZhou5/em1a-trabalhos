import type { GetStaticProps, NextPage as AppPage } from "next";
import Head from "next/head";

import { supabase } from "../../lib/supabase";
import { Task } from "../../types/Task";

import Frame from "../../components/pages/App/Frame";
import TasksList from "../../components/pages/App/TasksList";
import api from "../../services/api";

interface Props {
  tasks: {
    data: Task[];
    count: number;
  };
}

const Home: AppPage<Props> = ({ tasks }) => {
  return (
    <main className="px-3 py-2 md:px-8 md:py-4 lg:py-6 lg:px-16">
      <Head>
        <title> Mural da EM1A </title>
      </Head>

      <div className="w-full flex flex-col items-center">
        <Frame />

        <div className="my-2 relative">
          <span className="text-xs"> Materiais </span>
        </div>

        <div className="w-full flex flex-row md:max-w-lg xl:max-w-5xl relative">
          {/* <div className="absolute md:right-0 md:bottom-0 md:left-[-48px] md:top-0 md:w-10 md:h-10 right-4 bottom-4 bg-white rounded-full w-8 h-8 flex justify-center items-center shadow-box">
            <button className="">
              <TbPlus className="w-6 h-6 text-black" />
            </button>
          </div> */}

          <TasksList tasks={tasks?.data} />

          <div className="hidden lg:max-h-64 lg:flex w-56 border border-gray100 rounded-lg bg-black p-1 flex-col justify-center items-center">
            <span> Total: {tasks.count} </span>
            <span className="text-xs text-gradient"> Em breve </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // const { data, count } = await supabase.from<Task>("tasks").select("*", { count: "exact" });

  const { data } = await api.get("/tasks?count");

  return {
    props: {
      tasks: {
        // data: [{ id: "1", title: "Teste", due: "04/12/2022", type: "test", owner: "Yuu", description: "" }],
        data: data.data,
        count: data.count,
      },
    },
  };
};

export default Home;
