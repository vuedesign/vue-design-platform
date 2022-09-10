import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { isObject, isNumberString } from 'class-validator';

@Injectable()
export class QueryTransformPipe implements PipeTransform {
    constructor(private exclude: Array<string> = []) {}
    transform(value: any, metadata: ArgumentMetadata) {
        if (isObject(value)) {
            let temp = {};
            Object.keys(value).forEach((key) => {
                if (
                    value[key] === '' ||
                    value[key] === undefined ||
                    value[key] === null
                ) {
                    temp[key] = '';
                } else if (
                    typeof value[key] === 'string' &&
                    this.exclude.includes(key)
                ) {
                    temp[key] = value[key];
                } else if (isNumberString(value[key])) {
                    temp[key] = Number(value[key]);
                } else {
                    temp[key] = value[key];
                }
            });
            return temp;
        }
        return value;
    }
}
