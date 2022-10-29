#!/usr/bin/env node

'use strict';

/**
 * Usage: export in your environment the 3 following environment variables:
 *  * ENV: required. Environment to use (one of 'dev', 'stage', or 'prod').
 *  * CHUNK_SIZE: optional. Define the size of the chunks for the multi part upload. Default: 5.
 *  make sure that you have valid credentials for accessing the AWS account where the bucket is.
 *  Run: ./index.js
 */

const {
    S3Client,
    CompleteMultipartUploadCommand,
    CreateMultipartUploadCommand,
    UploadPartCommand,
} = require('@aws-sdk/client-s3');

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const { getChunkSize, getEnv, getBucketName, listFiles } = require('./utils');
const { baseDir } = require('./constant');

const env = getEnv();

if (['dev', 'stage', 'prod'].indexOf(env) === -1) {
    throw new Error('invalid environment, must be one of dev, stage or prod');
}

const chunkSize = getChunkSize();

const asyncReadFile = promisify(fs.readFile);

/**
 * upload a list of files to a S3 bucket using multi-part upload
 * the size of chunks can by setting `CHUNK_SIZE` in your environment
 * default chunk size: 5Mb
 * @param {string[]} files
 */
const s3 = new S3Client({
    region: 'eu-central-1',
});
async function uploadToS3(files) {
    const partSize = 1024 * 1024 * chunkSize;
    const s3BucketName = getBucketName();

    await Promise.all(
        files.map(async (p) => {
            console.log(`attempting to upload file '${p}' to bucket ${s3BucketName}...`);

            try {
                const buf = await asyncReadFile(p);

                const parts = Math.ceil(buf.length / partSize);
                let ContentType;
                if (p.endsWith('.jpeg')) {
                    throw new Error(
                        `Atlantis' image-service does not support JPEG, use JPG extension for file '${p}'`,
                    );
                }
                if (p.endsWith('.json')) ContentType = 'application/json';
                if (p.endsWith('.jpg')) ContentType = 'image/jpeg';
                if (p.endsWith('.png')) ContentType = 'image/png';

                const uploadParamsBase = {
                    Bucket: s3BucketName,
                    Key: path.basename(p),
                };

                const req = new CreateMultipartUploadCommand({ ...uploadParamsBase, ContentType });

                const data = await s3.send(req);

                console.log(
                    `upload of ${p} started in ${parts} part(s). Upload ID: ${data.UploadId}`,
                );

                let completeObj = {
                    ...uploadParamsBase,
                    MultipartUpload: {
                        Parts: [],
                    },
                    UploadId: data.UploadId,
                };

                let i = 0;
                for (let start = 0; start < buf.length; start += partSize) {
                    i++;
                    const dataPart = await s3.send(
                        new UploadPartCommand({
                            ...uploadParamsBase,
                            PartNumber: i,
                            UploadId: data.UploadId,
                            Body: buf.slice(start, Math.min(start + partSize, buf.length)),
                        }),
                    );

                    console.log(`part uploaded. Etag: ${dataPart.ETag}`);
                    completeObj.MultipartUpload.Parts.push({
                        ETag: dataPart.ETag,
                        PartNumber: i,
                    });
                }

                await s3.send(new CompleteMultipartUploadCommand(completeObj));
                console.log(`file at ${p} was successfully uploaded`);
            } catch (err) {
                console.log(err);
            }
        }),
    );

    return files;
}

listFiles(baseDir)
    .then((files) => uploadToS3(files))
    .then(() => process.exit(0))
    .catch((err) => {
        console.error('PANIC', err);
        process.exit(1);
    });
