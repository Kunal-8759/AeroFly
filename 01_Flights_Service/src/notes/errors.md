# if there is any error from the mysql databases
- error.name='SeuelizeValidationError'
- there might be the chance from the database we should get 2 or more validation error.
- this error object has errors array holds all the information about all the error

- ![alt text](<WhatsApp Image 2024-08-06 at 17.25.18_578f9f80.jpg>) it looks like this

- if(error.name == 'SeuelizeValidationError'){
            let explanantion=[];//makes an array for the error.message
            error.errors.forEach((err)=>{
                explanantion.push(err.message);
            })

            throw new AppError(explanantion,StatusCodes.BAD_REQUEST);
        }
