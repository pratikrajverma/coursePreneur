const cloudinary = require('cloudinary').v2;

const uploadImage = async (file, folder, height, quality) => {
 
         const options = {folder};

         if(height){
            options.height = height;
         }

         if(quality){
            options.quality = quality;
         }

         options.resource_type = 'auto';

        return await cloudinary.uploader.upload(file.tempFilePath, options);
}

module.exports = {uploadImage};        //Is line mein, hum "uploadImage" function ko ek object ke andar daal kar export kar rahe hain. Agar hum future mein is object mein aur bhi properties add karna chahte hain, jaise ki "downloadImage" ya kuch aur, toh hum asaani se add kar sakte hain bina poore module ko modify kiye. to hum ye kah sakte he ki multiple function ek sath export kar sakte he
                                       //NOTE:  Haan, aap sahi hain. Ek hi function ko export karne ke liye curly braces ka upayog karne ki koi avashyakta nahi hai. Seedha function ka reference dena kafi hota hai Eg.  module.exports = uploadImage;
