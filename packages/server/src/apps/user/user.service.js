'use strict';
var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b;
          }) ||
        function (d, b) {
          for (var p in b)
            if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function (d, b) {
      if (typeof b !== 'function' && b !== null)
        throw new TypeError(
          'Class extends value ' + String(b) + ' is not a constructor or null',
        );
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
exports.__esModule = true;
exports.UserService = exports.CreateUser = void 0;
var common_1 = require('@nestjs/common');
var typeorm_1 = require('@nestjs/typeorm');
var create_user_dto_1 = require('./dto/create-user.dto');
var user_entity_1 = require('../../entities/user.entity');
var mapped_types_1 = require('@nestjs/mapped-types');
var base_service_1 = require('@/globals/services/base.service');
var CreateUser = /** @class */ (function (_super) {
  __extends(CreateUser, _super);
  function CreateUser() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  return CreateUser;
})((0, mapped_types_1.PartialType)(create_user_dto_1.CreateUserDto));
exports.CreateUser = CreateUser;
var UserService = /** @class */ (function (_super) {
  __extends(UserService, _super);
  function UserService(userRepository) {
    var _this = _super.call(this, userRepository) || this;
    _this.userRepository = userRepository;
    return _this;
  }
  UserService.prototype.create = function (createUser) {
    this.userRepository.create(createUser);
    return this.userRepository.save(createUser);
  };
  UserService.prototype.findList = function (query) {
    return this.findListAndPage(query);
  };
  UserService.prototype.findOne = function (query) {
    return this.userRepository.findOne({
      where: query,
    });
  };
  UserService.prototype.update = function (id, updateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  };
  UserService.prototype.remove = function (id) {
    return this.userRepository['delete'](id);
  };
  UserService.prototype.count = function () {
    return this.userRepository.count();
  };
  UserService = __decorate(
    [
      (0, common_1.Injectable)(),
      __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    ],
    UserService,
  );
  return UserService;
})(base_service_1.BaseService);
exports.UserService = UserService;
