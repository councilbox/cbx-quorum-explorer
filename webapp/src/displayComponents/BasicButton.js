import React from "react";
import { Button } from "material-ui";
import { ButtonIcon } from "./index";
import { CircularProgress } from "material-ui/Progress";

const BasicButton = ({
	color,
	id,
	error,
	text,
	resetDelay = 2700,
	loadingColor = "white",
	textStyle,
	reset,
	buttonStyle,
	icon,
	type = 'raised',
	disabled,
	textPosition,
	onClick,
	fullWidth,
	loading,
	success,
	floatRight
}) => {
	if ((error || success) && !!reset) {
		let timeout = setTimeout(() => {
			reset();
			clearTimeout(timeout);
		}, resetDelay);
	}

	return (
		<Button
			id={id}
			disableRipple={loading}
			style={{
				textTransform: 'none',
				...buttonStyle,
				...textStyle,
				backgroundColor: success ? "green" : error ? "red" : color,
				float: floatRight && "right",
				outline: "0",
				cursor: loading? 'wait' : 'pointer'
			}}
			disabled={disabled || loading}
			variant={type}
			{...(!success && !loading? {onClick: onClick} : {})}
			fullWidth={fullWidth}
		>
			{text}
			{success ? (
				<ButtonIcon type="checkIcon" color="white" />
			) : error ? (
				<ButtonIcon type="clear" color="white" />
			) : loading ? (
				<div
					style={{
						color: loadingColor,
						marginLeft: "0.3em"
					}}
				>
					<CircularProgress size={12} color={"inherit"} />
				</div>
			) : (
				icon
			)}
		</Button>
	);
};

export default BasicButton;
