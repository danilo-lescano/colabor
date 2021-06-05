import React from 'react';
import {makeStyles} from '@material-ui/core';

export type SpinnerProps = {
	size?: number;
	className?: string;
	primaryColor?: string;
	secondaryColor?: string;
	borderWidth?: string;
	children?: JSX.Element | Array<JSX.Element | null | string> | null | string;
};

const useStyles = makeStyles({
	spinner: {
		border: 'solid',
		borderRadius: '50%',
		animation: `$spin 1s linear infinite`
	},
	'@keyframes spin': {
		from: {
			transform: 'rotateZ(0deg)'
		},
		to: {
			transform: 'rotateZ(360deg)'
		}
	}
});

const Spinner = ({size = 1, className = '', primaryColor = 'rgb(0, 186, 255)', secondaryColor = '#00000020', borderWidth = '.25rem', children}: SpinnerProps) => {
	const classes = useStyles();
	return (
		<>
			<div
				className={`${classes.spinner} ${className}`}
				style={{
					height: `${size}rem`,
					width: `${size}rem`,
					borderColor: `${primaryColor} ${primaryColor} ${primaryColor} ${secondaryColor}`,
					borderWidth: borderWidth,
					display: 'inline-block'
				}}
			/>
			{children}
		</>
	);
};

export default Spinner;
