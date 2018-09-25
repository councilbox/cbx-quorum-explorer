import React from "react";
import { Icon } from "./index";

const ButtonIcon = ({ type, color, style }) => (
	<Icon
		className="material-icons"
		style={{
			color: color,
			fontSize: "1.1em",
			marginLeft: "0.3em",
			...style
		}}
	>
		{type}
	</Icon>
);

export default ButtonIcon;
