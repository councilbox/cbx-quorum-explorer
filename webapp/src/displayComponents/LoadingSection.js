import React from "react";
import { CircularProgress } from "material-ui/Progress";

const LoadingSection = ({ size = 60, color = "primary" }) => (
	<div
		style={{
			display: "flex",
			height: "100%",
			width: "100%",
			alignItems: "center",
			justifyContent: "center"
		}}
	>
		<CircularProgress size={size} thickness={7} color={color} />
	</div>
);

export default LoadingSection;
