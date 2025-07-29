"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatService = void 0;
const common_1 = require("@nestjs/common");
let FormatService = class FormatService {
    getValueByArray(entries, path) {
        let value = entries;
        for (const key of path) {
            if (value[key] !== undefined) {
                value = value[key];
            }
            else {
                return undefined;
            }
        }
        return value;
    }
    getValue(entries, path) {
        return entries[path];
    }
};
exports.FormatService = FormatService;
exports.FormatService = FormatService = __decorate([
    (0, common_1.Injectable)()
], FormatService);
//# sourceMappingURL=format.service.js.map