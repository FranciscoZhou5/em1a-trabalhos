import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { supabase } from "../../../lib/supabase";
import { Task } from "../../../types/Task";

interface Props {
  task: Task;
}

const TaskPage: NextPage<Props> = ({ task }) => {
  return (
    <div>
      <div>{task?.title}</div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data, error } = await supabase.from("tasks").select("*");

  const tasks = data as Task[];
  const paths = tasks.map((item) => ({
    params: {
      id: item.id.toString(),
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { id } = ctx.params as Params;

  const { data, error } = await supabase.from<Task>("tasks").select("*").eq("id", id);

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      task: data[0],
    },
  };
};

export default TaskPage;
