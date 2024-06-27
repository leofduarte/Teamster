import React from 'react';
import { Link } from 'react-router-dom';
import LogoPill from '../../../storage/app/public/logos/logo-teamster.svg'


function Logo() {
  return (
    <>
<div className="flex justify-end w-full">
      <img src={LogoPill} alt="Teamster Logo" className="w-52 rounded-full drop-shadow justify-end" />
</div>
</>
  );
}

export default Logo;
