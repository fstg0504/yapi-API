const yapi = require('../yapi.js');
const baseModel = require('./base.js');

class avatarModel extends baseModel {
    getName() {
        return 'avatar';
    }

    getSchema() {
        return {
            uid: { type: Number, required: true },
            basecode: String,
            type: String,
            icon1: String,
            icon2: String,
            icon3: String
        };
    }
    
    get(uid) {

        return this.model.findOne({
            uid: uid
        });
    }

    up(uid, basecode, type){
        return this.model.update({
            uid: uid
        }, {
            $set: {
                type: type,
                basecode: basecode
            }
           
        },{
            upsert: true
        })
    }

    upIcon(uid, icon1, icon2, icon3){
        return this.model.update({
            uid: uid
        }, {
            $set: {
                icon1: icon1,
                icon2: icon2,
                icon3: icon3
            }
        },{
            upsert: true
        })
    }

}

module.exports = avatarModel;