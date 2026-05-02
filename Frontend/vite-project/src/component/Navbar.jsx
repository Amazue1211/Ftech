import React from 'react'

function Navbar() {
  return (
    <div>
<div>
    <nav className='flex align-middle text-center'>
        <ul><li><a href="/">Home</a></li></ul>
         <ul><li><a href="/">About</a></li></ul>
          <ul><li><a href="/">Contact</a></li></ul>
           <ul><li><a href="/">Service</a></li></ul>
    </nav>
   <div>
     <button>Login</button> <button>Signup</button>
   </div>
</div>

    </div>
  )
}

export default Navbar