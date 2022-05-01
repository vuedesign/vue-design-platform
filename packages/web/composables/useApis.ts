import { readonly } from "vue";

export default () => {
  return readonly({
    AUTH_PROFILE: "/auth/profile",
    AUTH_LOGIN: "/auth/login",
    AUTH_LOGOUT: "/auth/logout",
    AUTH_REGISTER: "/auth/register",
    TAGS: "/tags",
  });
};
