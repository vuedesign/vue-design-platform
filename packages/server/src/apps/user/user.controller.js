"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.UserController = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("typeorm");
var swagger_1 = require("@nestjs/swagger");
var create_user_dto_1 = require("./dto/create-user.dto");
var UserController = /** @class */ (function () {
    function UserController(userService) {
        this.userService = userService;
    }
    UserController.prototype.create = function (createUserDto) {
        return this.userService.create(createUserDto);
    };
    UserController.prototype.findAll = function (size, page, search, order, status, rule) {
        var options = {
            size: size,
            page: page,
            order: {
                updatedAt: 'DESC'
            },
            where: {}
        };
        var isPhone = function (str) {
            return !isNaN(Number(str));
        };
        if (search) {
            if (isPhone(search)) {
                options.where['phone'] = (0, typeorm_1.Like)("%".concat(search, "%"));
            }
            else {
                options.where['username'] = (0, typeorm_1.Like)("%".concat(search, "%"));
            }
        }
        if (status !== undefined) {
            if (status === 1 || status === 2) {
                options.where['status'] = status;
            }
            else {
                delete options.where['status'];
            }
        }
        if (rule !== undefined) {
            if (rule === 1 || rule === 2 || rule === 3) {
                options.where['rule'] = rule;
            }
            else {
                delete options.where['rule'];
            }
        }
        console.log('options.where===', options);
        return this.userService.findList(options);
    };
    UserController.prototype.count = function () {
        return this.userService.count();
    };
    UserController.prototype.findOne = function (id) {
        return this.userService.findOne({
            id: id
        });
    };
    UserController.prototype.update = function (id, updateUserDto) {
        return this.userService.update(id, updateUserDto);
    };
    UserController.prototype.remove = function (id) {
        return this.userService.remove(id);
    };
    __decorate([
        (0, common_1.Post)(),
        (0, swagger_1.ApiBody)({
            description: '添加用户信息',
            type: create_user_dto_1.CreateUserDto
        }),
        __param(0, (0, common_1.Body)())
    ], UserController.prototype, "create");
    __decorate([
        (0, common_1.Get)(),
        __param(0, (0, common_1.Query)('size', new common_1.DefaultValuePipe(20), common_1.ParseIntPipe)),
        __param(1, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
        __param(2, (0, common_1.Query)('search')),
        __param(3, (0, common_1.Query)('order')),
        __param(4, (0, common_1.Query)('status', new common_1.DefaultValuePipe(0), common_1.ParseIntPipe)),
        __param(5, (0, common_1.Query)('rule', new common_1.DefaultValuePipe(0), common_1.ParseIntPipe))
    ], UserController.prototype, "findAll");
    __decorate([
        (0, common_1.Get)('count')
    ], UserController.prototype, "count");
    __decorate([
        (0, common_1.Get)(':id'),
        __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe))
    ], UserController.prototype, "findOne");
    __decorate([
        (0, common_1.Put)(':id'),
        __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
        __param(1, (0, common_1.Body)())
    ], UserController.prototype, "update");
    __decorate([
        (0, common_1.Delete)(':id'),
        __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe))
    ], UserController.prototype, "remove");
    UserController = __decorate([
        (0, common_1.Controller)('users'),
        (0, swagger_1.ApiTags)('用户模块'),
        (0, swagger_1.ApiBearerAuth)()
    ], UserController);
    return UserController;
}());
exports.UserController = UserController;
