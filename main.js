const path = require("path");
const fs = require('fs');

class Require {

    static get cwd(){
        return process.cwd();
    }


    static fixPath(...args){
        return new Require(path.join(this.cwd, ...args));
    }
    
    constructor(filepath){
        this.filepath = filepath;
        this.value = null;
        this.ids = [];
    }

    get inCache(){
        return this.resolved in require.cache
    }

    get loaded(){
        return this.value !== null
    }

    get resolved(){
        return require.resolve(this.filepath)
    }

    async resolve(){
        return require.resolve(this.filepath);
    }

    async delete(){
        let _req_path = require.resolve(this.filepath)
        if(_req_path in require.cache){
            delete require.cache[_req_path];
        }
        return _req_path;
    }

    async load(){
        this.value = require(await this.resolve());
    }

    async unload(){
        await this.delete()
        this.value = null;
    }

    async reload(){
        let _req_path = await this.delete();
        this.value = require(_req_path);
    }
}

module.exports = Require;


