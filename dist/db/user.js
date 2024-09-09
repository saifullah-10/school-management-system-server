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
exports.getUserByToken = exports.updateSessionTokenById = exports.updateSessionToken = exports.createUser = exports.getUserByEmail = void 0;
const mongodb_1 = require("mongodb");
const connectToDB_1 = require("./connectToDB");
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield (0, connectToDB_1.connectToDatabase)();
        const usersColl = db.collection("users");
        const getByEmail = yield usersColl.findOne({ email });
        return getByEmail;
    }
    catch (err) {
        console.error("User Not Found");
    }
});
exports.getUserByEmail = getUserByEmail;
const createUser = (email, password, salt, username) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, connectToDB_1.connectToDatabase)();
    const users = db.collection("users");
    const query = {
        email,
        username,
        authentication: {
            salt,
            password,
        },
    };
    const create = yield users.insertOne(query);
    return create;
});
exports.createUser = createUser;
const updateSessionToken = (email, data) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, connectToDB_1.connectToDatabase)();
    const users = db.collection("users");
    const options = { upsert: true };
    const updateUser = yield users.updateOne({ email }, { $set: { sessionToken: data } }, options);
    return updateUser;
});
exports.updateSessionToken = updateSessionToken;
const updateSessionTokenById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, connectToDB_1.connectToDatabase)();
    const users = db.collection("users");
    const updateUser = yield users.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { sessionToken: data } });
    return updateUser;
});
exports.updateSessionTokenById = updateSessionTokenById;
const getUserByToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, connectToDB_1.connectToDatabase)();
    const users = db.collection("users");
    const userByToken = yield users.findOne({ sessionToken: token });
    return userByToken;
});
exports.getUserByToken = getUserByToken;
//# sourceMappingURL=user.js.map