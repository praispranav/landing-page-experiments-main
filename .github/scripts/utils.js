const fs = require('fs');

const { promisify } = require('util');

const asyncLstat = promisify(fs.lstat);
const asyncReadDir = promisify(fs.readdir);

const buckets = {
    dev: 'fe-cle-images-029720204697',
    stage: 'fe-cle-images-988478710043',
    prod: 'fe-cle-images-251511879130',
};

const getEnv = () => process.env.ENV || '';

module.exports.getBucketName = () => buckets[getEnv()];

module.exports.getChunkSize = () => {
    const { CHUNK_SIZE } = process.env;

    const cs = Number(CHUNK_SIZE);
    return isNaN(cs) ? 5 : cs;
};

module.exports.getEnv = getEnv;

/**
 * look for files recursively in a directory
 * @param {string} dir
 * @return {Promise<string[]>} list of paths
 */

module.exports.listFiles = async function listFiles(dir) {
    const stat = await asyncLstat(dir);

    if (!stat.isDirectory()) {
        throw new Error(`${dir} is not a valid directory`);
    }

    const entries = (await asyncReadDir(dir)).filter((file) => !file.startsWith('.'));

    let filesPath = [];

    // check if we have dir and do recursion
    for (let entry of entries) {
        const entryPath = `${dir}/${entry}`;
        const entryDescription = await asyncLstat(entryPath);

        if (entryDescription.isFile()) {
            filesPath.push(entryPath);
        } else if (entryDescription.isDirectory()) {
            const files = await listFiles(entryPath);
            filesPath = [...filesPath, ...files];
        }
    }
    return filesPath;
};
