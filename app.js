import express from 'express';
import ejs from 'ejs';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import methodOverride from 'method-override';
import { getAllPhotos, getPhoto, createPhoto, updatePhoto, deletePhoto } from './controllers/photoControllers.js';
import { getAboutPage, gettAddPage, getEditPage } from './controllers/pageControllers.js';

const app = express();

// connect DB
mongoose.connect('mongodb://localhost/pcat-test-db');

//Template Engine
app.set('view engine', 'ejs');

//Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.json()); // for parsing application/json
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

app.get('/', getAllPhotos);
app.get('/photos/:id', getPhoto);
app.post('/photos', createPhoto);
app.put('/photos/:id', updatePhoto);
app.delete('/photos/:id', deletePhoto);

app.get('/about', getAboutPage);
app.get('/add', gettAddPage);
app.get('/photos/edit/:id', getEditPage);



const port = 3000;

app.listen(port, () => {
  console.log(`sunucu ${port} portunda çalışıyor`);
});
