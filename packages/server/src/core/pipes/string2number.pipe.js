"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.String2numberPipe = void 0;
var common_1 = require("@nestjs/common");
var class_validator_1 = require("class-validator");
var String2numberPipe = /** @class */ (function () {
    function String2numberPipe(schema) {
        this.schema = schema;
    }
    String2numberPipe.prototype.transform = function (value, metadata) {
        var _this = this;
        if ((0, class_validator_1.isObject)(value)) {
            var temp_1 = {};
            Object.keys(value).forEach(function (key) {
                if (value[key] === '' ||
                    value[key] === undefined ||
                    value[key] === null) {
                    temp_1[key] = '';
                }
                else if (typeof value[key] === 'string' &&
                    _this.schema.includes(key)) {
                    temp_1[key] = value[key];
                }
                else if ((0, class_validator_1.isNumberString)(value[key])) {
                    temp_1[key] = Number(value[key]);
                }
                else {
                    temp_1[key] = value[key];
                }
            });
            return temp_1;
        }
        return value;
    };
    String2numberPipe = __decorate([
        (0, common_1.Injectable)()
    ], String2numberPipe);
    return String2numberPipe;
}());
exports.String2numberPipe = String2numberPipe;
