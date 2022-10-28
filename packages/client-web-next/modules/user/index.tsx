import type { NextPage } from 'next';
import Head from 'next/head';
import List from '@/components/List';
import Top from '@/components/Top';
import Footer from '@/components/Footer';
import UserHeader from '@/components/UserHeader';
import { wrapper } from '@/globals/store';
import { sites } from '@/globals/services/siteApi';
import { user } from '@/globals/services/userApi';
import { count } from '@/globals/services/countApi';
import { User } from '@/globals/types/auth';
import { getParamsByContext } from '@/globals/utils';
import styles from './User.module.scss';
import { setQuery } from '@/globals/features/siteSlice';
import { containerStyle, headerStyle } from '@/globals/utils/style';

type UserPropsQuery = {
    page: number;
    size: number;
    authorId: number;
};
type UserProps = {
    user: User;
    params: UserPropsQuery;
};

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
        const uuid = getParamsByContext<typeof context>(context, 'uuid');
        console.log('## uuid', uuid);
        const { data: userData } = await store.dispatch(user.initiate(uuid));
        if (!userData) {
            return {
                props: {} as UserProps,
            };
        }
        console.log('userData', userData);
        const params = {
            page: Number(context.query.page || 1),
            size: Number(context.query.size || 20),
            authorId: userData.id,
        };
        await store.dispatch(setQuery(params));
        await store.dispatch(sites.initiate(params));
        await store.dispatch(count.initiate(userData.id));
        return {
            props: {
                user: userData,
                params,
            },
        };
    },
);

const User: NextPage<UserProps> = ({ user, params }: UserProps) => {
    return (
        user && (
            <div className={styles.container} style={containerStyle}>
                <Head>
                    <title>{'用户首页 - vue.design'}</title>
                    <meta
                        name="description"
                        content="一个能一键分享前端资源（网站、代码、工具、文章）、发现前端资源的导航平台。"
                    />
                </Head>
                <div className={styles['top-bg']} style={headerStyle}>
                    <Top />
                </div>
                <UserHeader user={user} />
                <List pageType="user" user={user} params={params} />
                <Footer />
            </div>
        )
    );
};

export default User;
