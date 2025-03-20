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
	/**
	 * 是否使用 replace 模式
	 */
	replace?: boolean
}

const Link = (props: ILinkProps) => {

	const { className, to, children, replace } = props
	const history = useHistory()

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		if (replace) {
			history.replace(to);
			return;
		}
		history.push(to);
	};

	return (
		<a href={to} className={className} onClick={handleClick}>
			{children}
		</a>
	);
};

export default Link;

