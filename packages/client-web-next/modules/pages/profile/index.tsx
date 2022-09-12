import type { NextPage } from 'next';
import Head from 'next/head';
import Top from '@/modules/components/Top';
import Footer from '@/modules/components/Footer';
import ProfileHeader from '@/modules/components/ProfileHeader';
import ProfileList from '@/modules/components/ProfileList';
// import List from '@/modules/components/List';
import { wrapper } from '@/modules/store';
import { profile, sites, counts } from '@/modules/services/authApi';
import styles from './Profile.module.scss';

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
        await store.dispatch(profile.initiate());
        await store.dispatch(counts.initiate());
        await store.dispatch(
            sites.initiate({
                size: 20,
                page: 1,
            }),
        );
        return {
            props: {},
        };
    },
);

type ProfileProps = {};

const Profile: NextPage<ProfileProps> = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>vue.design-profile</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles['top-bg']}>
                <Top />
            </div>
            <ProfileHeader />
            <ProfileList />
            <Footer />
        </div>
    );
};

export default Profile;