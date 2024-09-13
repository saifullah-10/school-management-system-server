"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notice_1 = require("../controllers/notice");
exports.default = (router) => {
    router.post("/notice/send", notice_1.postNoticeDataCollection);
    router.get("/notice", notice_1.getNoticeDataCollection);
};
//# sourceMappingURL=noticeRoute.js.map