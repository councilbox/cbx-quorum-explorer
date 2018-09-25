import React from "react";
import Grid from "material-ui/Grid";

const GridItem = ({ children, lg, md, xs, style, onClick }) => (
	<Grid item xs={xs} md={md} lg={lg} style={style} onClick={onClick}>
		{children}
	</Grid>
);

export default GridItem;
