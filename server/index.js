const express = require('express');
const app = express();

   
    
//importing  
// const bodyParser = require('body-parser'); 
const{cloudinaryConnect} = require('./config/cloudinary'); 
const database = require('./config/database');    
const fileupload = require('express-fileupload');
const cors = require('cors');    
const cookieParser =  require('cookie-parser');    
require('dotenv').config();    
      
 
    
 

//middleware
// app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(cors({
            origin: 'http://localhost:3000',
            credentials:true,
        }));

app.use(fileupload({
            useTempFiles: true, 
            tempFileDir: '/tmp',
        }));
        


//set port number
const PORT = process.env.PORT || 4000;

//database connection
database.connectDB();

//cloudinary connection
cloudinaryConnect() 
  

//routes importing  
const userRoutes = require('./routes/User');    
const profileRoutes = require('./routes/Profile');    
const paymentRoutes = require('./routes/Payment');    
const courseRoutes = require('./routes/Course');    
  

//routes handling
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/payment', paymentRoutes);
app.use('/api/v1/course', courseRoutes);


//default route
app.use('/',(req,res)=>{ 
    return res.json({
        success:true,
        message:'welcome to Backend Server StudyNotion..... '
    })
})





        

        


//server initialisation
app.listen(PORT, ()=>{
    console.log(`App is running on port ${PORT}`);
})


