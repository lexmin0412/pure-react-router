import React from 'react';
import history from '../utils/history';

interface ILinkProps { to: string; children: React.ReactNode }

const Link = (props: ILinkProps) => {

	const { to, children } = props

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    console.log('pushpuish', to )
    history.push(to);
  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
};

export default Link;

