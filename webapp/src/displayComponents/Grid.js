import React from "react";
import Grid from "material-ui/Grid";

const GridWrapper = ({
	children,
	alignItems,
	alignContent,
	style,
	className,
	spacing = 8,
	justify,
	onKeyUp
}) => (
	<Grid
		container
		justify={justify}
		className={className}
		alignItems={alignItems}
		alignContent={alignContent}
		onKeyUp={onKeyUp}
		style={style}
		spacing={spacing}
	>
		{children}
	</Grid>
);

export default GridWrapper;
