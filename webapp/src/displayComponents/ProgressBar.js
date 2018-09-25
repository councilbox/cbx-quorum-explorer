import React from "react";
import { LinearProgress } from "material-ui/Progress";

const ProgressBar = ({ value, style }) => (
	<LinearProgress
		variant="determinate"
		value={value}
		style={{
			...style,
			backgroundColor: "lightgrey"
		}}
		color={"secondary"}
	/>
);

export default ProgressBar;
