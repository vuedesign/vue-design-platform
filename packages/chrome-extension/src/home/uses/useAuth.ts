import { reactive } from 'vue';
import { loginData, profileData, registerData } from '../../globals/apis';
import { state, UserData } from './useStore';

export interface FormData {
    account: string;
    password: string;
}

export const formData: FormData = reactive({
    account: '18602042482',
    password: 'string',
});

export default function useAuth() {
    const handleLogin = async (): Promise<void> => {
        const { token } = await loginData(formData);
        if (token) {
            state.token = token;
            chrome.storage.local.set({ token }, () => {
                state.view = 'modal-content';
            });
        }
    };

    const handleRegister = async (): Promise<void> => {
        const { token } = await registerData(formData);
        if (token) {
            console.log('token register:', token);
            chrome.storage.local.set({ token }, () => {
                state.view = 'modal-content';
            });
        }
    };

    const handleLogout = () => {
        chrome.storage.local.remove('token');
        chrome.storage.local.remove('info');
        state.token = '';
        state.user = null;
    };

    const findProfile = async () => {
        const res = await profileData<any, UserData>({});
        console.log('res findProfile:', res);
        if (res) {
            state.user = res;
        }
    };

    const handleGotoRegister = () => {
        state.view = 'modal-register';
    };

    const handleGotoLogin = () => {
        state.view = 'modal-login';
        console.log('handleGotoLogin');
    };

    const handleGotoInfo = () => {
        state.view = 'modal-content';
    };

    return {
        handleLogin,
        handleLogout,
        handleRegister,
        handleGotoLogin,
        handleGotoRegister,
        findProfile,
        handleGotoInfo,
    };
}
