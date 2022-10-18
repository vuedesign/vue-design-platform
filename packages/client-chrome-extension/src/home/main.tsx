import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '../globals/store';
import '@/assets/styles/normalize.scss';
import '@/assets/styles/globals.scss';
import Home from './Home';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <Home />
    </Provider>,
);
