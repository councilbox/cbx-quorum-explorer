import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-cbx';

class Scrollbar extends React.Component {

    scrollbar = null;

    scrollToBottom() {
        this.scrollbar.scrollToBottom();
    }

    getScrollTop() {
        return this.scrollbar.getScrollTop()
    }

    getScrollHeight(){
        return this.scrollbar.getScrollHeight();
    }

    getValues(){
        return this.scrollbar.getValues();
    }

    render(){
        const { style, autoHide, children, showX, onScrollStop } = this.props;

        return(
            <Scrollbars
                ref={ref => this.scrollbar = ref}
                autoHide={autoHide}
                onScrollStop={onScrollStop}
                style={{
                    width: '100%',
                    height: '100%',
                    ...style
                }}
                {...(!showX? {
                    renderTrackHorizontal: () => <span style={{display: 'hidden'}} />,
                    renderThumbHorizontal: () => <span style={{display: 'hidden'}} />
                } : {})}
            >
                {children}
            </Scrollbars>
        )
    }
}
export default Scrollbar;