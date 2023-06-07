import React, { useState } from 'react';

interface Props{
  children: React.ReactNode
}

const AuthForm: React.FC<Props> = ({ children }) => {
  const [value, setValue] = useState('');
  // const onChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
  //   setValue(event.target.value);
  // };
  return (
   <form>
    {children}
  </form>
  )
}

export default AuthForm