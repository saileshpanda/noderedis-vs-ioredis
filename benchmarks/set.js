module.exports = ({TEST_LEN, TEST_DATA, nodeRedis, ioredis, type}) => ([
    // node_redis set
    async () => {
        console.time('node_redis set');

        let len = TEST_LEN;
        while (len--) {
            await (new Promise(resolve => {
                nodeRedis.set(`node_redis:${type}`, TEST_DATA.string, resolve);
            }));
        }

        console.timeEnd('node_redis set');
    },

    // node_redis set with multi
    async () => {
        console.time('node_redis set with multi');

        let len = TEST_LEN;
        let multi = nodeRedis.multi();
        while (len--) {
            multi.set(`node_redis:${type}`, TEST_DATA.string);
        }
        await (new Promise(resolve => {
            multi.exec(resolve);
        }));

        console.timeEnd('node_redis set with multi');
    },

    // ioredis set
    async () => {
        console.time('ioredis set');

        let len = TEST_LEN;
        while (len--) {
            await (ioredis.set(`ioredis:${type}`, TEST_DATA.string));
        }

        console.timeEnd('ioredis set');
    },

    // ioredis set with pipeline
    async () => {
        console.time('ioredis set with pipeline');

        let len = TEST_LEN;
        let pipeline = ioredis.pipeline();
        while (len--) {
            pipeline.set(`ioredis:${type}`, TEST_DATA.string);
        }
        await (pipeline.exec());

        console.timeEnd('ioredis set with pipeline');
    },

    // ioredis set with multi
    async () => {
        console.time('ioredis set with multi');

        let len = TEST_LEN;
        let multi = ioredis.multi();
        while (len--) {
            multi.set(`ioredis:${type}`, TEST_DATA.string);
        }
        await (multi.exec());

        console.timeEnd('ioredis set with multi');
    }
]);
