import isEmail from 'validator/lib/isEmail';
import isNumeric from 'validator/lib/isNumeric';

export function getFieldType(account: string) {
    if (isNumeric(account)) {
        return 'phone';
    } else if (isEmail(account)) {
        return 'email';
    }
    return 'username';
}
