const zod=require("zod");

const signUpValidation = zod.object({
    username: zod.string().min(1),
    password: zod.string().min(1),
    firstname: zod.string().min(1),
    lastname: zod.string().min(1)
})

const signInValidation = zod.object({
    password: zod.string().min(1),
    firstname: zod.string().min(1),
    lastname: zod.string().min(1)
})

module.exports = {signUpValidation,signInValidation}

