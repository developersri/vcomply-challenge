let { findMany } = require('../lib/db/crud');

const getList = async (req, res) => {
    let weeklyoffs = await findMany('weekly_offs', {});
    res.json({ data: weeklyoffs });
}

module.exports = {
    getList,
};