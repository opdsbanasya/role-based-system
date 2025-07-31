const bcrypt = require("bcrypt");
const User = require("../models/user")

const seedAdmin = async () => {
    const defaultAdminExists = await User.findOne({email: "super.admin@gmail.com"});
    
    if(!defaultAdminExists){
        const passwordHash = await bcrypt.hash("Super@123", 10);
        const adminUser = new User({
            firstName: "Super",
            lastName: "Admin",
            email: "super.admin@gmail.com",
            password: passwordHash,
            role: "admin"
        })
        await adminUser.save();
        console.log("Default admin created")
    } else {
        console.log("Default admin is alredy exists")
    }
};

module.exports = seedAdmin;