const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleChangePassword = async (req, res) => {
  const { oldPwd, newPwd } = req.body;
  if (!oldPwd || !newPwd)
    return res
      .status(400)
      .json({ message: "Old password and new password are required." });

  //   const cookies = req.cookies;
  //   if (!cookies?.jwt) return res.sendStatus(204); //No content
  //   const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ oldPwd }).exec();

  //   const match = await bcrypt.compare(pwd, foundUser.password);

  // check for duplicate usernames in the db
  //   const duplicate = await User.findOne({ email }).exec();
  //   if (duplicate) return res.sendStatus(409); //Conflict

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(newPwd, 10);

    foundUser.password = hashedPwd;

    await foundUser.save();

    console.log(hashedPwd);

    console.log(foundUser.password);

    res.status(201).json({ success: `Password change sucessfully!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleChangePassword };
