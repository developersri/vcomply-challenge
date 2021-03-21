const { getConnectionFromState: connect } = require('./connect');

const create = async (collection, document) => {
    try {
        const con = await connect();
        return await con.collection(collection).insertOne(document);
    } catch (err) {
        throw err;
    }
};

const findMany = async (collection, query, ctrlParams) => {
    try {
        const db = await connect();
        let result = await db.collection(collection).find(query);
        if (ctrlParams) {
            if (ctrlParams.page && ctrlParams.pageSize) {
                result = result.skip(+ctrlParams.pageSize * (+ctrlParams.page - 1)).limit(+ctrlParams.pageSize);
            }
            if (ctrlParams.sortOrder && ctrlParams.sortBy) {
                let sortObj = {};
                sortObj[ctrlParams.sortBy] = ctrlParams.sortOrder || -1;
                result = result.sort(sortObj);
            }
        }
        result = result.toArray();
        return result;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    create,
    findMany,
};
