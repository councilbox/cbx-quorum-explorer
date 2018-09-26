import React from "react";

const withWindowSize = WrappedComponent => {
	return class WithWindowSize extends React.Component {
		state = {
			size: "lg",
			orientation: 'landscape'
		};

		updateSize = () => {
			if (window.innerWidth < 960) {
				this.setState({ size: "xs" });
			} else if (window.innerWidth < 1200) {
				this.setState({ size: "md" });
			} else if (window.innerWidth < 1600) {
				this.setState({ size: "lg" });
			} else {
				this.setState({ size: "xl" });
			}

			const { orientation } = window.screen;

			if(orientation){
				if(orientation.type.includes('portrait')){
					this.setState({
						orientation: "portrait"
					})
				} else {
					this.setState({
						orientation: 'landscape'
					})
				}
			} else {
				if (window.innerWidth < window.innerHeight) {
					this.setState({ orientation: "portrait" });
				} else {
					this.setState({ orientation: "landscape" });
				}
			}

			const element = document.getElementById('mainContainer');

			if(element){
				element.style.height = window.screen.availHeight;
			}
		};

		componentDidMount() {
			this.updateSize();
			window.addEventListener("resize", this.updateSize);
		}

		componentWillUnmount() {
			window.removeEventListener("resize", this.updateSize);
		}

		render() {
			return (
				<WrappedComponent
					updateSize={this.updateSize}
					orientation={this.state.orientation}
					windowSize={this.state.size}
					{...this.props}
				/>
			);
		}
	};
};

export default withWindowSize;
