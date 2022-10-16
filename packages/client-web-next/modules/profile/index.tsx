import type { NextPage } from 'next';
import Head from 'next/head';
import Top from '@/components/Top';
import Footer from '@/components/Footer';
import ProfileHeader from '@/components/ProfileHeader';
import ProfileList from '@/components/ProfileList';
// import List from '@/modules/components/List';
import { wrapper } from '@/globals/store';
import { profile, sites, counts } from '@/globals/services/authApi';
import styles from './Profile.module.scss';
import { containerStyle, headerStyle } from '@/globals/utils/style';

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
        <div className={styles.container} style={containerStyle}>
            <Head>
                <title>个人中心 - vue.design</title>
                <meta
                    name="description"
                    content="一个能一键分享前端资源（网站、代码、工具、文章）、发现前端资源的导航平台。"
                />
            </Head>
            <div className={styles['top-bg']} style={headerStyle}>
                <Top />
            </div>
            <ProfileHeader />
            <ProfileList />
            <Footer />
        </div>
    );
};

export default Profile;
