import React from 'react';
import { API_STATUS_ENDPOINT } from '../../config';
import { Tooltip } from 'material-ui';
import { isMobile } from 'react-device-detect';

class ServerStatus extends React.Component {

    state = {
        status: 'DOWN',
        server: ''
    }

    interval = null;

    componentDidMount() {
        this.interval = setInterval(this.checkStatus, 3000);
        this.checkStatus();
    }

    checkStatus = async () => {
        try {
            const response = await fetch(API_STATUS_ENDPOINT);
            const json = await response.json();
            this.setState({
                status: json.status,
                server: json.node.version.split('/')[1]
            })
        } catch (error){
            console.log(error);
        }

    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    render() {
        const { status } = this.state;

        return (
            <React.Fragment>
                {!isMobile &&
                    <Tooltip title={this.state.server}>
                        <span style={{fontSize: '.7em', color: process.env.REACT_APP_VERSION === 'alastria'? 'white' : 'inherit'}}>STATUS</span>
                    </Tooltip>
                }
                <Tooltip title={this.state.server}>
                    <div style={{
                        width: '1em',
                        height: '1em',
                        marginLeft: '0.6em',
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: status === 'SYNCING'? '#ffd600' : status === 'UP'? '#4CAF50' : 'red',
                        borderRadius: '50%'
                    }} />
                </Tooltip>
            </React.Fragment>
        )
    }
}

export default ServerStatus;
