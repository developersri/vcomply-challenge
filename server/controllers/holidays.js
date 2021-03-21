let { findMany } = require('../lib/db/crud');

const getList = async (req, res) => {
    let holidays = await findMany('holidays', {});
    res.json({ data: holidays });
}

module.exports = {
    getList,
};