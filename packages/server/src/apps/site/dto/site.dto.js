"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SiteListQueryDto = exports.SiteStatus = exports.SiteType = void 0;
var swagger_1 = require("@nestjs/swagger");
var SiteType;
(function (SiteType) {
    // ALL = '',
    SiteType["CODE"] = "code";
    SiteType["SITE"] = "site";
})(SiteType = exports.SiteType || (exports.SiteType = {}));
var SiteStatus;
(function (SiteStatus) {
    SiteStatus["ALL"] = "";
    SiteStatus[SiteStatus["AVAILABLE"] = 1] = "AVAILABLE";
    SiteStatus[SiteStatus["DISABLE"] = 2] = "DISABLE";
})(SiteStatus = exports.SiteStatus || (exports.SiteStatus = {}));
// title, type, status, size, page, order
var SiteListQueryDto = /** @class */ (function () {
    function SiteListQueryDto() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: '每页数量',
            "default": 20,
            type: Number,
            required: false
        })
    ], SiteListQueryDto.prototype, "size");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: '当前页数',
            "default": 1,
            type: Number,
            required: false
        })
    ], SiteListQueryDto.prototype, "page");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: '排序',
            "default": 'updatedAt DESC',
            required: false
        })
    ], SiteListQueryDto.prototype, "order");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: '类型',
            "default": '',
            "enum": ['site', 'code'],
            required: false
        })
    ], SiteListQueryDto.prototype, "type");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: '标题',
            "default": '',
            required: false
        })
    ], SiteListQueryDto.prototype, "title");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: '状态',
            "default": '',
            "enum": [1, 2],
            required: false
        })
    ], SiteListQueryDto.prototype, "status");
    return SiteListQueryDto;
}());
exports.SiteListQueryDto = SiteListQueryDto;
