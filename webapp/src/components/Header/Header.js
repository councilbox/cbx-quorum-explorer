import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import logo from "../../assets/img/logo.png";
import smallIcon from '../../assets/img/logo-icono.png';
import { Paper } from 'material-ui';
import SearchInput from "../../displayComponents/SearchInput";
import ServerStatus from '../ServerStatus/ServerStatus';
import withWindowSize from '../../HOCs/withWindowSize';

const Header = props => {
    return (
        <Paper
            style={{
                width: '100%',
                height: '3.5em',
                borderBottom: '1px solid gainsboro',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 1.6em'
            }}
        >
        <div style={{width: props.windowSize === 'xs'? '15%' : '5%', display: 'flex', justifyContent: 'flex-start'}}>
                <Link to="/">
                    <img
                        style={{
                            height: "1.8em"
                        }}
                        src={props.windowSize === 'xs'? smallIcon : logo}
                        alt="Logo"
                    />
                </Link>
            </div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: props.windowSize === 'xs'? '80%' : '35%'}}>
                <SearchInput history={props.history}/>
            </div>
            <div style={{width: props.windowSize === 'xs'? '15%' : '5%', display: 'flex', justifyContent: 'flex-end'}}>
                <ServerStatus />
            </div>
        </Paper>
    );
}



export default withRouter(withWindowSize(Header));
