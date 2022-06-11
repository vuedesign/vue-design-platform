"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateUserDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var CreateUserDto = /** @class */ (function () {
    function CreateUserDto() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: '用户名'
        })
    ], CreateUserDto.prototype, "username");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: '头像'
        })
    ], CreateUserDto.prototype, "avatar");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: '昵称',
            required: false
        })
    ], CreateUserDto.prototype, "nickname");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: '邮箱',
            required: false
        })
    ], CreateUserDto.prototype, "email");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: '手机号',
            required: false
        })
    ], CreateUserDto.prototype, "phone");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: '用户密码',
            required: true
        })
    ], CreateUserDto.prototype, "password");
    __decorate([
        (0, swagger_1.ApiProperty)({
            name: 'is_show',
            "default": 1,
            description: '是否可用：1-可用，2-不可用',
            required: true
        })
    ], CreateUserDto.prototype, "isShow");
    __decorate([
        (0, swagger_1.ApiProperty)({
            "default": 3,
            description: '角色：1-超级管理员，2-管理员，3-普通用户',
            required: true
        })
    ], CreateUserDto.prototype, "rule");
    return CreateUserDto;
}());
exports.CreateUserDto = CreateUserDto;
