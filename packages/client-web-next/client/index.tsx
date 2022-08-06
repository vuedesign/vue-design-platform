import Head from 'next/head';
import type { NextPage } from 'next';
import styles from './styles/Home.module.scss';
import List from './components/List';
import Header from './components/Header';
import Footer from './components/Footer';
import { wrapper } from './redux/store';
import { authProfile, navigations, sites } from '../globals/apis';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    await store.dispatch(authProfile.initiate());
    await store.dispatch(navigations.initiate());
    await store.dispatch(sites.initiate());
    return {
      props: {},
    };
  },
);

type HomeProps = {};

const Home: NextPage<HomeProps> = ({}: HomeProps) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>vue.design</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <List type="home" />
      <Footer />
    </div>
  );
};

export default Home;