const redis = require ('ioredis')
var uri
if(process.env.REDIS_PROVIDER){
    uri = process.env.REDIS_PROVIDER.includes("://") ? process.env.REDIS_PROVIDER : process.env[process.env.REDIS_PROVIDER]
}
module.exports = new redis(uri)