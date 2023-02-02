const app = require('express')();
const cors = require('cors');
const multer = require('multer');
const path = require('path')

const port = process.env.PORT || 3000
app.use(cors())
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './src/uploads');
    },
    filename: (req, file, cb) => {
        console.log('fdfdf=', file)
      cb(null, Date.now() + path.extname(file.originalname))
    }
  });

  let upload = multer({
    storage
  });

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
       res.status(201).send({ message:'File uploaded Successfully!!' })
    } catch (e) {
        res.status(400).send({ message:'File not uploaded Successfully!!' })
    }
})

app.listen(port, () => {
    console.log(`server is started on port ${port}`)
})