"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateNavigationDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var CreateNavigationDto = /** @class */ (function () {
    function CreateNavigationDto() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({
            "default": 1,
            description: 'siteId'
        })
    ], CreateNavigationDto.prototype, "siteId");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: '导航'
        }),
        (0, class_validator_1.IsNotEmpty)({
            message: '导航不能为空！'
        }),
        (0, class_validator_1.IsString)()
    ], CreateNavigationDto.prototype, "title");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: '项目描述'
        }),
        (0, class_validator_1.IsString)()
    ], CreateNavigationDto.prototype, "description");
    __decorate([
        (0, swagger_1.ApiProperty)({
            "default": 1,
            description: '排序'
        })
    ], CreateNavigationDto.prototype, "order");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: 'icon url',
            required: false
        }),
        (0, class_validator_1.IsString)()
    ], CreateNavigationDto.prototype, "iconUrl");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: '网站 url',
            required: false
        }),
        (0, class_validator_1.IsString)()
    ], CreateNavigationDto.prototype, "siteUrl");
    __decorate([
        (0, swagger_1.ApiProperty)({
            "default": 1,
            description: '是否可用：1-可用，2-不可用'
        })
    ], CreateNavigationDto.prototype, "status");
    return CreateNavigationDto;
}());
exports.CreateNavigationDto = CreateNavigationDto;
