import React from "react";
import { createMuiTheme, MuiThemeProvider } from "material-ui/styles";
import { primary, secondary } from "../styles/colors";

const theme = createMuiTheme({
	palette: {
		type: 'light',
		primary: {
			main: primary
		},
		secondary: {
			main: secondary
		}
	},

	typography: {
		fontFamily: ['Lato', 'Roboto', 'Helvetica'],
	},

	overrides: {
		MuiDialog: {
			root: {
				zIndex: 1001,
			}
		},
		MuiDialogTitle: {
			root: {
				fontSize: '0.8em'
			}
		},
		MuiDrawer: {
			paper: {
				zIndex: 999
			},
			modal: {
				zIndex: 999
			}
		},
		MuiIconButton: {
			root: {
				height: '34px !important'
			}
		},
		MuiInput: {
			underline: {
				"&:hover:not($disabled):before": {
					//underline color when hovered
					backgroundColor: secondary
				},
				"&:after": {
					backgroundColor: secondary
				}
			}
		},
		MuiInputLabel: {
			root: {
				color: secondary
			}
		},
		MuiMenu: {
			paper: {
				zIndex: 998
			}
		},
		MuiMenuItem: {
			root: {
				fontSize: '14px !important'
			}
		},
		MuiSelect : {
			select: {
				fontSize: '15px !important'
			}
		},
		MuiStepper: {
			root: {
				backgroundColor: "transparent",
			},
			horizontal: {
				height: '6em',
				overflow: 'hidden',
			}
		},
		MuiTable: {
			root: {
				maxWidth: "90%"
			}
		},
		MuiTableCell: {
			body: {
				fontSize: '13px',
			}
		},
		MuiTableRow: {
			root: {
				width: "50%"
			}
		},
		MuiTooltip: {
			tooltip: {
				fontSize: "13px"
			}
		},
		MuiTypography: {
			title: {
				fontSize: "1.25rem"
			}
		}
	}
});

const ThemeProvider = ({ children }) => (
	<MuiThemeProvider theme={theme}>
		{children}
	</MuiThemeProvider>
);


export default ThemeProvider;
