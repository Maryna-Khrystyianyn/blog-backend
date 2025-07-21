

const uploadImg = (req, res, next) => {
    try {
     res.json({ url: `/uploads/${req.file.originalname}` });
    }catch(error){
    console.error(error);
    next(error);
    }
 next();
};

export const requestImg = {
  uploadImg,
};
