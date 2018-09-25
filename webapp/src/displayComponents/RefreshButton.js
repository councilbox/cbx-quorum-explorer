import React from "react";
import FilterButton from "./FilterButton";
import { Icon } from "material-ui";
import { secondary } from "../styles/colors";

const RefreshButton = ({ tooltip, loading, onClick }) => (
	<FilterButton
		tooltip={tooltip}
		loading={loading}
		size="2em"
		onClick={onClick}
	>
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center"
			}}
		>
			<Icon
				className="material-icons"
				style={{ color: 'white', fontSize: "1.2em" }}
			>
				cached
			</Icon>
		</div>
	</FilterButton>
);

export default RefreshButton;
