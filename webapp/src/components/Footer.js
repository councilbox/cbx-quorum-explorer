import React from 'react';
import { darkGrey } from '../styles/colors';
import { isMobile } from 'react-device-detect';
import logo from '../assets/img/cbx-span.png';

const Footer = props => (
    <div style={{fontSize: '11px', marginTop: isMobile? '1.2em' : '-0.2em', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '1em'}}>
        <a href="https://github.com/Councilbox" style={{marginRight: '0.4em', color: darkGrey, display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
            <img src={logo} style={{height: '8px', width: 'auto', marginRight: '0.1em'}} />
        </a>
        <a href="https://github.com/Councilbox" style={{marginRight: '0.4em', marginLeft: '-0.2em', color: darkGrey}}>
           <i className="fa fa-github" aria-hidden="true" style={{color: darkGrey, marginLeft: '0.4em'}}></i>
        </a>
        <div
            dangerouslySetInnerHTML={{ __html: `&mdash;`}}
        />
        <div
            dangerouslySetInnerHTML={{ __html: `Copyright &copy 2018`}}
            style={{marginLeft: '0.3em'}}
        />
        <a href="https://www.councilbox.com" style={{marginLeft: '0.2em', marginRight: '0.2em', color: darkGrey}}>Councilbox Technology S.L.</a>
    </div>
)

export default Footer;