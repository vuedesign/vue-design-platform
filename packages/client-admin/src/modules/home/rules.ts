const validateName = async (rule, value) => {
    if (value === '') {
        return Promise.reject('项目名称不能为空！');
    } else {
        return Promise.resolve();
    }
};

const validateDescription = async (rule, value) => {
    if (value === '') {
        return Promise.reject('项目描述不能为空！');
    } else {
        return Promise.resolve();
    }
};

export const addRules = {
    name: [{ validator: validateName, trigger: 'change' }],
    description: [{ validator: validateDescription, trigger: 'change' }],
};
