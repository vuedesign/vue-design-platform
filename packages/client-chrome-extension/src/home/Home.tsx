import HomeHeader from '../components/HomeHeader';
import List from '../components/List';
import Bottom from '../components/Bottom';
import Footer from '../components/Footer';

function Home() {
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
        </div>
    );
}

export default Home;
