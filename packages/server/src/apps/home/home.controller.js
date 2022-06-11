"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomeController = void 0;
var common_1 = require("@nestjs/common");
var auth_decorator_1 = require("../../core/decorators/auth.decorator");
var HomeController = /** @class */ (function () {
    function HomeController(userService, siteService, navigationService) {
        this.userService = userService;
        this.siteService = siteService;
        this.navigationService = navigationService;
    }
    HomeController.prototype.viewCount = function () {
        return Promise.resolve(22983);
    };
    HomeController.prototype.count = function () {
        return Promise.all([
            this.userService.count(),
            this.siteService.count(),
            this.navigationService.count(),
            this.viewCount(),
        ]).then(function (res) {
            var user = res[0], site = res[1], navigation = res[2], view = res[3];
            return {
                user: user,
                site: site,
                navigation: navigation,
                view: view
            };
        });
    };
    __decorate([
        (0, auth_decorator_1.Public)(),
        (0, common_1.Get)('count')
    ], HomeController.prototype, "count");
    HomeController = __decorate([
        (0, common_1.Controller)('home')
    ], HomeController);
    return HomeController;
}());
exports.HomeController = HomeController;
