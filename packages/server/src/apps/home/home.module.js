"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomeModule = void 0;
var common_1 = require("@nestjs/common");
var home_controller_1 = require("./home.controller");
var user_module_1 = require("../user/user.module");
var site_module_1 = require("../site/site.module");
var navigation_module_1 = require("../navigation/navigation.module");
var HomeModule = /** @class */ (function () {
    function HomeModule() {
    }
    HomeModule = __decorate([
        (0, common_1.Module)({
            imports: [user_module_1.UserModule, site_module_1.SiteModule, navigation_module_1.NavigationModule],
            controllers: [home_controller_1.HomeController]
        })
    ], HomeModule);
    return HomeModule;
}());
exports.HomeModule = HomeModule;
