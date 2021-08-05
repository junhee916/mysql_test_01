const express = require('express')
const db = require('../database')
const router = express.Router()

router.get('/', async (req, res) => {

    try{
        const result = await db.promise().query("SELECT*FROM USERS");

        res.status(200).json({
            msg : "get users",
            userInfo : {
                id : result.id,
                result : result[0]
            }
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
            db.promise().query(`INSERT INTO USERS (nickname, password) VALUES ('${nickname}', '${password}');`)

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

router.put('/:userId', async (req, res) => {

    const id = req.params.userId

    const nickname = req.body.nickname;

    const sql  = "UPDATE users SET nickname = ? WHERE id = ?"

    try{
        const result = await db.promise().query(sql, [nickname, id])

        res.status(200).json({
            msg  : "update userInfo",
            userInfo : result
        })
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
})

router.delete('/', async (req, res) => {

    try{
        await db.promise().query("delete from users")

        res.status(200).json({
            msg : "delete users"
        })
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
})

module.exports = router