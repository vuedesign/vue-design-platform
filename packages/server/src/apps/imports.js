"use strict";
exports.__esModule = true;
var auth_module_1 = require("./auth/auth.module");
var user_module_1 = require("./user/user.module");
var site_module_1 = require("./site/site.module");
var tag_module_1 = require("./tag/tag.module");
var file_module_1 = require("./file/file.module");
var navigation_module_1 = require("./navigation/navigation.module");
var home_module_1 = require("./home/home.module");
exports["default"] = [
    auth_module_1.AuthModule,
    user_module_1.UserModule,
    site_module_1.SiteModule,
    tag_module_1.TagModule,
    file_module_1.FileModule,
    navigation_module_1.NavigationModule,
    home_module_1.HomeModule,
];
