import { FC } from 'react';
import HomeHeader from '../components/HomeHeader';
import List from '../components/List';
import Bottom from '../components/Bottom';
import Footer from '../components/Footer';
import ModalAuth from '../components/ModalAuth';
import ModalSetting from '../components/ModalSetting';

const Home: FC = () => {
    const params = {
        page: 1,
        size: 20,
    };
    return (
        <div className="Home">
            <HomeHeader />
            <List pageType="home" params={params} />
            <Bottom />
            <Footer />
            <ModalAuth />
            <ModalSetting />
        </div>
    );
};

export default Home;
