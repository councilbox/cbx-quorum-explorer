import React from 'react';
import { darkGrey } from '../styles/colors';
import { isMobile } from 'react-device-detect';

const Footer = props => (
    <div style={{fontSize: '11px', marginTop: isMobile? '1.2em' : '-0.2em', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '1em'}}>
        <div
            dangerouslySetInnerHTML={{ __html: `Copyright &copy 2018`}}
        />
        <a href="https://www.councilbox.com" style={{marginLeft: '0.2em', marginRight: '0.2em', color: darkGrey}}>Councilbox Technology S.L.</a>
        <div
            dangerouslySetInnerHTML={{ __html: `&mdash;`}}
        />
        <a href="https://github.com/Councilbox" style={{marginLeft: '0.2em', marginRight: '0.2em', color: darkGrey}}>
           <i class="fa fa-github" aria-hidden="true" style={{color: darkGrey, marginLeft: '0.2em'}}></i>
        </a>
    </div>
)

export default Footer;