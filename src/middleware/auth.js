const auth = async (req,res,next) => {
    console.log("Middleware For Auth")
    next()
}

module.exports = auth