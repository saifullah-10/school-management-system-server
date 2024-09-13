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
exports.getNoticeData = exports.postNoticeData = void 0;
const connectToDB_1 = require("./connectToDB");
const postNoticeData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield (0, connectToDB_1.connectToDatabase)();
        const collection = db.collection("notice");
        const saveData = yield collection.insertOne(data);
        return saveData;
    }
    catch (err) {
        return err;
    }
});
exports.postNoticeData = postNoticeData;
const getNoticeData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield (0, connectToDB_1.connectToDatabase)();
        const collection = db.collection("notice");
        const saveData = yield collection.find().toArray();
        return saveData;
    }
    catch (err) {
        return err;
    }
});
exports.getNoticeData = getNoticeData;
//# sourceMappingURL=notice.js.map