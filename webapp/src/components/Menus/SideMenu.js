import React from 'react';
import { NavLink } from 'react-router-dom';
import Grid from '../../displayComponents/Grid';
import GridItem from '../../displayComponents/GridItem';
//import icon from '../../assets/img/cbx-explorer.png';
import smallIcon from '../../assets/img/imago-councilbox-inverse-xl.png';
import alastriaIcon from '../../assets/img/alastria-icon.png';

const icon = process.env.REACT_APP_VERSION === 'alastria'? alastriaIcon : smallIcon;

const TopLinks = [
    {
        text: 'Blocks',
        url: '/blocks',
        icon: 'grid_on'
    },
    {
        text: 'Transactions',
        url: '/transactions',
        icon: 'wrap_text'
    },
]


const SideMenu = props => {

    const content = <React.Fragment>
        <div style={{borderBottom: '1px solid grey', width: '3.5em', height: '3.5em', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.6em'}}>
            <img src={icon} alt={'councilbox-icon'} style={{width: props.mobile? '3em' : '2.2em', height: 'auto'}} />
        </div>
        {TopLinks.map((link, index) =>
            <TopLink
                key={`topLink_${index}`}
                url={link.url}
                icon={link.icon}
                text={link.text}
                {...(index > 0? {style: {marginTop: '0.2em'}} : {})}
            />
        )}
    </React.Fragment>

    return(
        !props.mobile?
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                {content}
            </div>
        :
            <Grid style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', height: '100%', width: '100%', padding: '0.2em'}}>
                {TopLinks.map((link, index) =>
                    <GridItem xs={6} md={6} lg={6} key={`topLink_${index}`}>
                        <TopLink
                            icon={link.icon}
                            url={link.url}
                            text={link.text}
                        />
                    </GridItem>
                )}
            </Grid>
    )
}

export default SideMenu;


const TopLink = ({ url, style, text, icon }) => (
    <NavLink
        activeStyle={{
            backgroundColor: process.env.REACT_APP_VERSION === 'alastria'? '#00BAA4' : '#00acc1',
            borderRadius: '3px',
            fontWeight: '700',
            color: 'white',
            transition: "all 300ms linear",
        }}
        style={{
            height: '4em',
            width: 'calc(100% - 6px)',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1em',
            color: 'white',
            fontWeight: '700',
            textDecoration: 'none',
            ...style
        }}
        to={url}
    >

        <i className="material-icons">
            {icon}
        </i>
        <span style={{fontSize: '10px'}}>{text}</span>
    </NavLink>
)
