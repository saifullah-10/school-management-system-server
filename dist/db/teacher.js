"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postTeacher = void 0;
const connectToDB_1 = require("./connectToDB");
const postTeacher = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, connectToDB_1.connectToDatabase)();
    const coll = db.collection("users");
    try {
        const res = yield coll.insertOne(data);
        return res;
    }
    catch (err) {
        return err;
    }
});
exports.postTeacher = postTeacher;
//# sourceMappingURL=teacher.js.map