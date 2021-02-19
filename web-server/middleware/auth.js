const bcrypt = require("bcrypt")
const jwt = require("jwt")

const auth = async (req ,res , next) => {
    try {
        const token = req.header("authorization").replace("Bearer " , "")
    } catch (e) {
        
    }
}