import axios from "axios";

const oss = class {

    async create(c){

        let data = await axios
            .get('/api/aliyun/token')
            .then(r => {

                if ( r.data.status === 1 ){
                    return r.data.content
                }
                if ( r.data.status === 0 ){
                    return null
                }

            })
            .catch(r => {
                return null
            })

        if ( data === null ){
            throw new Error('token obtain error')
        }

        let AccessKeyId = data.AccessKeyId
        let AccessKeySecret = data.AccessKeySecret
        let SecurityToken = data.SecurityToken

        const OSS = require('ali-oss')
        const oss = new OSS({
            region: config.aliyun.region,
            accessKeyId: AccessKeyId,
            accessKeySecret: AccessKeySecret,
            stsToken: SecurityToken,
            secure: config.aliyun.secure,
            bucket: config.aliyun.bucket,
            timeout: config.aliyun.timeout,
            cname: config.aliyun.cname,
            endpoint: config.aliyun.endpoint
        })


        this.client = oss

    }

    async put(key, data){

        let client = this.client

        return await client.put(key, data)

    }


}


export default {
    install: function(Vue, options) {

        // Vue.prototype.$oss = oss

    }
}