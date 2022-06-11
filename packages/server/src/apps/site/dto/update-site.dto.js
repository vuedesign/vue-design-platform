"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateFieldDto = exports.UpdateSiteDto = void 0;
var mapped_types_1 = require("@nestjs/mapped-types");
var swagger_1 = require("@nestjs/swagger");
var create_site_dto_1 = require("./create-site.dto");
var UpdateSiteDto = /** @class */ (function (_super) {
    __extends(UpdateSiteDto, _super);
    function UpdateSiteDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UpdateSiteDto;
}((0, mapped_types_1.PartialType)(create_site_dto_1.CreateSiteDto)));
exports.UpdateSiteDto = UpdateSiteDto;
var UpdateFieldDto = /** @class */ (function () {
    function UpdateFieldDto() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: '要更新的字段'
        })
    ], UpdateFieldDto.prototype, "field");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: '要更新的数据'
        })
    ], UpdateFieldDto.prototype, "value");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: '数据类型'
        })
    ], UpdateFieldDto.prototype, "type");
    return UpdateFieldDto;
}());
exports.UpdateFieldDto = UpdateFieldDto;
