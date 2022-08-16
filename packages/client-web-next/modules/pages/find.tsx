import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../site/styles/Find.module.scss';
import List from '../site/components/List';
import Top from '../site/components/Top';
import Nav from '../site/components/Nav';
import Footer from '../site/components/Footer';

export async function getServerSideProps() {
  return {
    props: {},
  };
}

type FindProps = {};

const Find: NextPage<FindProps> = ({}: FindProps) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>vue.design-find</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <Top />
      </header>
      <section className={styles.main}>
        <Nav />
      </section>
      <List type="find" />
      <Footer />
    </div>
  );
};

export default Find;
