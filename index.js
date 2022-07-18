const BaseAdapter = require("ghost-storage-base")
const debug = require('ghost-ignition').debug('adapter')
const fs = require("fs");
const pinataSDK = require('@pinata/sdk');

class PinataStorageAdapter extends BaseAdapter {
    constructor(options = {}) {
        super()     
        this.gatewayUrl = options.gatewayUrl
        this.pinata = pinataSDK(options.pinataKey, options.pinataSecret);
    }

    async save(file) {     
        debug(`save:`, `${JSON.stringify(file)}`)
        const readableStreamForFile = fs.createReadStream(file.path);
        const options = {
            pinataMetadata: {
                name: file.name,
                keyvalues: {
                    ghostBlog: 'true'
                }
            },
            pinataOptions: {
                cidVersion: 0
            }
        };
        const { IpfsHash } = await this.pinata.pinFileToIPFS(readableStreamForFile, options)
        const link = `${this.gatewayUrl}/ipfs/${IpfsHash}`;
        return link;        
    }

    serve() {
        // No need to serve because absolute URLs are returned
        return (req, res, next) => {
            next();
        }
    }

    exists() {
      //    Because IPFS is immutable and nothing is actually updated, we never have to check for an existing file
      return res.status = 200;
    }

    delete(fileName) {
        // Delete unpins
        const results = await this.pinata.pinList({
            name: fileName
        });
        
        if(results && results.rows.length > 0) {
            const file = results.rows[0];
            return await this.pinata.unpin(file.IpfsHash);
        }

        return (req, res, next) => {
            next();
        }
    }

    read(options) {
        debug(`read:`, `${JSON.stringify(options)}`)
        const link = `${this.gatewayUrl}/ipfs/${options.cid}`;
        return link;     
    }
}

module.exports = PinataStorageAdapter