const Messages = require("../models/Message");


class MessageController {
    async getMessages (req, res, next) {
        try {
            const { from, to } = req.body;

            const messages = await Messages.find({
                $or: [
                    { receiver: to, sender: from },
                    { receiver: from, sender: to }
                  ]
            }).sort({ updatedAt: 1 });

            const projectedMessages = messages.map((msg) => {
                return {
                    fromSelf: msg.sender.toString() === from,
                    message: msg.message
                };
            });
            res.json(projectedMessages);
        } catch (ex) {
            next(ex);
        }
    };

    async addMessage (req, res, next){
        try {
            const { from, to, message } = req.body;
            const data = await Messages.create({
                message: message ,
                receiver: to,
                sender: from,
            });

            if (data) return res.json({ msg: "Đã thêm tin nhắn thành công!" });
            else return res.json({ msg: "Không thể thêm tin nhắn vào cơ sở dữ liệu!" });
        } catch (ex) {
            next(ex);
        }
    };

}

module.exports = new MessageController();