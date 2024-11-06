import React from 'react';
import { useHistory } from '../hooks';

interface ILinkProps {
	/**
	 * 自定义类名
	 */
	className?: string;
	/**
	 * 目标路由
	 */
	to: string;
	/**
	 * 子元素
	 */
	children: React.ReactNode
}

const Link = (props: ILinkProps) => {

	const { className, to, children } = props
	const history = useHistory()

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		history.push(to);
	};

	return (
		<a href={to} className={className} onClick={handleClick}>
			{children}
		</a>
	);
};

export default Link;

