/*
Councilbox Quorum Explorer HTTP API
Copyright (C) 2018 Aarón Fuentes González, Councilbox Technology, S.L.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/

import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../styles/App.css';
import Header from '../components/Header/Header';
import AppRouter from './AppRouter';
import SideMenu from '../components/Menus/SideMenu';
import ThemeProvider from '../displayComponents/ThemeProvider';
import { lightGrey, darkGrey } from '../styles/colors';
import withWindowSize from '../HOCs/withWindowSize';

class App extends React.Component {

    _renderRoutingLayout = () => (
        <React.Fragment>
            {this.props.orientation === 'landscape' &&
                <div style={{width: '5em', height: '100%', backgroundColor: darkGrey, borderRight: '1px solid gainsboro'}}>
                    <SideMenu />
                </div>
            }
            <div style={{overflowX: 'hidden', display: 'flex', flexDirection: 'column', width: this.props.orientation === 'portrait'? '100%' : 'calc(100% - 5em)', height: this.props.orientation === 'portrait'? 'calc(100% - 4.5em)' : '100%'}}>
                <div style={{width: '100%', height: '3.5em', borderBottom: '1px solid gainsboro'}}>
                    <Header />
                </div>
                <div style={{width: '100%', height: 'calc(100% - 3.5em)', backgroundColor: lightGrey, overflowX: 'hidden'}}>
                    <AppRouter />
                </div>
            </div>
            {this.props.orientation === 'portrait' &&
                <div style={{height: '4.5em', width: '100%', backgroundColor: darkGrey}}>
                    <SideMenu mobile={true} />
                </div>
            }
        </React.Fragment>
    )

    render(){
        return (
            <ThemeProvider>
                <div style={{width: '100%', height: window.screen.availHeight <= window.innerHeight? window.screen.availHeight : window.innerHeight, overflow: 'hidden', display: 'flex', flexDirection: this.props.orientation === 'portrait'? 'column' : 'row'}}>
                    <Router>
                        <Route component={this._renderRoutingLayout}/>
                    </Router>
                </div>
            </ThemeProvider>
        )
    }
}

export default withWindowSize(App);