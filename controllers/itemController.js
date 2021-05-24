const Item = require("../models/item");

exports.getItems = async (req, res, next) => {
    try {
        const items = await Item.find();
        res.status(200).send(items);
    } catch (e) {
        next(e);
    }
};

// exports.getItem = async (req, res, next) => {
//     try {
//         const item = await Item.findById(req.params.id)
//         if (!item) throw new Error("Cannot find item with id: ", req.params.id);
//         res.status(200).send(item);
//     } catch (e) {
//         next(e);
//     }
// };

exports.deleteItem = async (req, res, next) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (!item) throw new Error("Cannot find item with id: ", req.params.id);
        res.status(200).send(item);
    } catch (e) {
        next(e);
    }
};

exports.updateItem = async (req, res, next) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!item) throw new Error("Cannot find item with id: ", req.params.id);
        res.status(200).send(item);
    } catch (e) {
        next(e);
    }
};

exports.addItem = async (req, res, next) => {
    try {
        const item = new Item(req.body);
        await item.save();
        res.status(200).send(item);
    } catch (e) {
        next(e);
    }
};
