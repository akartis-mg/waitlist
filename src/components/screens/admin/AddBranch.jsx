import React, { useState } from react;

function AddBranch() {
  const [newBranch, setNewBranch] = useState({
    cid: "",
    name:"" ,
    average_duration: 0,
    address: {
      street: "",
      city: "",
      postal_code: 0,
      longitude: 0,
      latitude: 0,
    },

    info: {
        opening_days: {
          monday: {
            open: true,
             open_hour: 0 ,
            closing_hour : 0
  
  
          },
          tuesday: {
            open: true,
             open_hour: 0,
            closing_hour :0
          },
          wednesday: {
            open: true,
             open_hour:0,
            closing_hour : 0
          },
          thursday: {
            open: true ,
             open_hour: 0 ,
            closing_hour :0
          },
          friday: {
            open: true ,
             open_hour: 0 ,
            closing_hour :0
          },
          saturday: {
            open: true ,
             open_hour: 0 ,
            closing_hour :0
          },
          sunday: {
            open: true ,
             open_hour:  0,
            closing_hour :0
          }
        },
        phone: 0,
        website: ""
      },
  
      spots : {
        available: 0,
        not_available: 0 
      }
  });

  return <div></div>;
}

export default AddBranch;
