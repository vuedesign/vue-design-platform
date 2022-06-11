"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateSiteDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var CreateSiteDto = /** @class */ (function () {
    function CreateSiteDto() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: '项目名称'
        }),
        (0, class_validator_1.IsNotEmpty)({
            message: '项目名称不能为空！'
        }),
        (0, class_validator_1.IsString)()
    ], CreateSiteDto.prototype, "title");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: '项目描述',
            required: false
        }),
        (0, class_validator_1.IsString)()
    ], CreateSiteDto.prototype, "description");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: '封面 url'
        }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)({
            message: '项目封面不能为空！'
        })
    ], CreateSiteDto.prototype, "thumbUrl");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: 'logo url',
            required: false
        }),
        (0, class_validator_1.IsString)()
    ], CreateSiteDto.prototype, "logoUrl");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: 'icon url',
            required: false
        }),
        (0, class_validator_1.IsString)()
    ], CreateSiteDto.prototype, "iconUrl");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: '网站 url',
            required: false
        }),
        (0, class_validator_1.IsString)()
    ], CreateSiteDto.prototype, "siteUrl");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: '代码 url'
        }),
        (0, class_validator_1.IsString)()
    ], CreateSiteDto.prototype, "codeUrl");
    __decorate([
        (0, swagger_1.ApiProperty)({
            "default": 2,
            description: '作者id'
        })
    ], CreateSiteDto.prototype, "authorId");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: '标签',
            required: false
        }),
        (0, class_validator_1.IsString)()
    ], CreateSiteDto.prototype, "tagIds");
    __decorate([
        (0, swagger_1.ApiProperty)({
            "default": 0,
            description: '浏览量'
        })
    ], CreateSiteDto.prototype, "views");
    __decorate([
        (0, swagger_1.ApiProperty)({
            "default": 0,
            description: '收藏量'
        })
    ], CreateSiteDto.prototype, "collections");
    __decorate([
        (0, swagger_1.ApiProperty)({
            "default": 0,
            description: '顶'
        })
    ], CreateSiteDto.prototype, "top");
    __decorate([
        (0, swagger_1.ApiProperty)({
            "default": 0,
            description: '踩'
        })
    ], CreateSiteDto.prototype, "down");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: '类型: site code'
        }),
        (0, class_validator_1.IsString)()
    ], CreateSiteDto.prototype, "type");
    __decorate([
        (0, swagger_1.ApiProperty)({
            "default": 1,
            description: '是否可用：1-可用，2-不可用'
        })
    ], CreateSiteDto.prototype, "isShow");
    return CreateSiteDto;
}());
exports.CreateSiteDto = CreateSiteDto;
