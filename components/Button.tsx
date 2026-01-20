import React from 'react'
import { Button } from '@mui/material'; 
interface ButtonInterface {
 text: string;
 classStyle: string;
 icon ?: React.ReactNode; 
}

export const ButtonComponent: React.FC<ButtonInterface> = ({text, classStyle, icon}) => {
  return (
    <div className= {classStyle}>
        {icon}
        <Button sx={{color: "white", textTransform: 'capitalize', width: 'fit-content'}}> 
            {text}
        </Button>
    </div>
    
  )
}
