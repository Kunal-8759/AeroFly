there is a booking created in the database --> status : INITIATED
if the payment is going after the 5 mins we will update the status as CANCELLED
but if the payment is never going to be done -->status :INITIATED

here then comes the logic of cron jobs

What cron jobs will do -->we will run a loop like situation after every 30 min using cron
and if the booking createdAt is greater than 5 min in context of current time and
status : initiated then we will update the status :CANCELLED


at time t=0 pe cron job start hua -->
we will calculate time jo 5 min phle tha uske start hone se  
     const time =new Date(Date.now()- 1000*300); //time 5 mins ago
we will cancelled the booking which is createdAt lessThan 5 min , status != booked/cancelled

 # to get reference about the idempotency key /api
 ![alt text](image.png)