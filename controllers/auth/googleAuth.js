
const googleAuth = async(req, res) => {
    // const user = {
    //   _id: "123456", 
    //   email: "ygrabovych@gmail.com", 
    // };
    
    // req.user = user;
    const {_id: id} = req.user;
    console.log(id)
    const payload = {
      id,
    };
  
    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "23h" });
    console.log(token)
    await User.findByIdAndUpdate(id, { token });
  
    res.redirect(`http://localhost:3000/home?token=${token}`)
  }

  
  module.exports = googleAuth