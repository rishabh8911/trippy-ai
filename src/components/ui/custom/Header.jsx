import React from 'react'
import {Button} from '../button.jsx'

function Header() {
    return (
        <div className='p-1 flex h-16 justify-between items center shadow-black' >
        <img src="image.png" alt="travel logo" />
         <Button>sign in</Button>
        </div> 
    )


}


export default Header
