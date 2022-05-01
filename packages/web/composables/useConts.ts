import { readonly } from "vue";

export default function () {
  return readonly({
    SUCCESS_STATUS_CODE: 0,
    ERROR_STATUS_CODE: 1,
    TOKEN_KEY: "VUE_DESIGN_TOKEN",
  });
}
