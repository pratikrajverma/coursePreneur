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


//set port number
const PORT = process.env.PORT || 5000;


//database connection
database.connectDB();

//cloudinary connection
cloudinaryConnect() 
  

//middleware
// app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(cors({
            // origin: 'http://localhost:3000',
            origin: '*',
            credentials:true,
        }));

app.use(fileupload({
            useTempFiles: true, 
            tempFileDir: '/tmp',
        }));
        




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
        message:'welcome to Backend Server CoursePreneur..... '
    })
})





        

        


//server initialisation
app.listen(PORT, ()=>{
    console.log(`App is running on port ${PORT}`);
})


