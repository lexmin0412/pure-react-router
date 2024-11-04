import React from 'react';
import { useHistory } from '../hooks';

interface ILinkProps { to: string; children: React.ReactNode }

const Link = (props: ILinkProps) => {

	const { to, children } = props
  const history = useHistory()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    history.push(to);
  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
};

export default Link;

