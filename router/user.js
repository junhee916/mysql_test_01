const express = require('express')
const db = require('../database')
const router = express.Router()

router.get('/', async (req, res) => {

    try{
        const result = await db.promise().query("SELECT*FROM USERS");

        res.status(200).json({
            msg : "get users",
            userInfo : result[0]
        })
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
})

router.post('/', (req, res) => {

    const {nickname, password} = req.body
    
    if(nickname && password){
        try{
            db.promise().query(`INSERT INTO USERS VALUES ('${nickname}', '${password}');`)

            res.status(200).json({
                msg : "success signup"
            })
        }
        catch(err){
            res.status(500).json({
                msg : err.message
            })
        }
    }
    

})

module.exports = router