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
exports.getNoticeDataCollection = exports.postNoticeDataCollection = void 0;
const notice_1 = require("../db/notice");
const postNoticeDataCollection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, posted, postedBy } = req.body;
        if (!title || !content || !posted || !postedBy) {
            return res.status(404).json({ message: "All field Are Require" });
        }
        const noticeData = { title, content, posted, postedBy };
        // return res.json(noticeData);
        const saveToDb = yield (0, notice_1.postNoticeData)(noticeData);
        if (saveToDb.acknowledged) {
            return res.status(200).json({ message: 1 }).end();
        }
    }
    catch (err) {
        return res.status(403).json({ message: "Forbidden" }).end();
    }
});
exports.postNoticeDataCollection = postNoticeDataCollection;
const getNoticeDataCollection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getData = yield (0, notice_1.getNoticeData)();
        return res.status(200).json(getData);
    }
    catch (err) {
        return res.status(403).json({ message: "Forbidden" });
    }
});
exports.getNoticeDataCollection = getNoticeDataCollection;
// export const getNoticeData = async(req:express.Request,res:express.Response)=>{
//     try{}catch(err){
//         return res.status(403).json({message: "Forbidden"})
//     }
// }
// export const getNoticeData = async(req:express.Request,res:express.Response)=>{
//     try{}catch(err){
//         return res.status(403).json({message: "Forbidden"})
//     }
// }
// export const getNoticeData = async(req:express.Request,res:express.Response)=>{
//     try{}catch(err){
//         return res.status(403).json({message: "Forbidden"})
//     }
// }
//# sourceMappingURL=notice.js.map