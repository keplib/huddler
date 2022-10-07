import type { NextPage } from "next";

const Home: NextPage = () => {
  const env = process.env.TEST;
  console.log(env);

  return (
    <div>
      <h1 className="bg-blue-300">HELLO</h1>
    </div>
  );
};

export default Home;
