import { reactive } from 'vue';
import { loginData, profileData, registerData } from '../../globals/apis';
import { state } from './useStore';

export interface FormData {
    account: string;
    password: string;
}

export const formData: FormData = reactive({
    account: '18602042482',
    password: 'string',
});

export default function useAuth() {
    const handleLogin = async (): void => {
        const { token } = await loginData(formData);
        if (token) {
            chrome.storage.local.set({ token }, () => {
                state.view = 'modal-content';
            });
        }
    };

    const handleRegister = async (): void => {
        const { token } = await registerData(formData);
        if (token) {
            console.log('token register:', token);
            chrome.storage.local.set({ token }, () => {
                state.view = 'modal-content';
            });
        }
    };

    const handleLogout = () => {
        chrome.storage.local.remove('token', () => {
            // state.view = 'modal-login';
        });
    };

    const findProfile = async () => {
        const res = await profileData();
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

    return {
        handleLogin,
        handleLogout,
        handleRegister,
        handleGotoLogin,
        handleGotoRegister,
        findProfile,
    };
}
