import Head from "next/head";

const MainHead = (): JSX.Element => {
  return (
    <Head>
      <link key={1} rel="icon" href="/favicon.svg" />
      <title>My Games</title>
    </Head>
  );
};

export default MainHead;
