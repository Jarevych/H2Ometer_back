const getCurrentDate = (req, res, next) => {
    try {
      const currentDate = new Date();
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1; 
      const year = currentDate.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      
      req.formattedDate = formattedDate;
      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };
  
  module.exports = getCurrentDate;