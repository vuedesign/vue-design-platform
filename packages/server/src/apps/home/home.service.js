"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomeService = void 0;
var common_1 = require("@nestjs/common");
var HomeService = /** @class */ (function () {
    function HomeService() {
    }
    HomeService.prototype.create = function (createHomeDto) {
        return 'This action adds a new home';
    };
    HomeService.prototype.findAll = function () {
        return "This action returns all home";
    };
    HomeService.prototype.findOne = function (id) {
        return "This action returns a #".concat(id, " home");
    };
    HomeService.prototype.update = function (id, updateHomeDto) {
        return "This action updates a #".concat(id, " home");
    };
    HomeService.prototype.remove = function (id) {
        return "This action removes a #".concat(id, " home");
    };
    HomeService = __decorate([
        (0, common_1.Injectable)()
    ], HomeService);
    return HomeService;
}());
exports.HomeService = HomeService;
