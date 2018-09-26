import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { API_URL } from '../config';
import TablePage from './TablePage';
import ItemPage from './ItemPage';
import SearchItemPage from "./SearchItemPage";

class AppRouter extends React.Component {

    redirectTo = url => () => (
        <Redirect to={url} />
    )

    render(){
        return(
            <div style={{height: '100%', width: '100%', overflow: 'hidden', position: 'relative'}}>
                <Switch>
                    <Route path="/" exact render={this.redirectTo("/blocks")} />
                    )}/>
                    <Route path="/search/:query" render={(props) => {
                        return(
                            <SearchItemPage
                                history={props.history}
                                match={props.match}
                                location={props.location}
                                server={API_URL}
                            />
                        )
                    }}/>
                    {["/transactions",
                        "/blocks",
                        "/block/:value/transactions",
                        "/account/:value/transactions"].map(path =>
                        <Route key={path} path={path} render={(props) => {
                            return(
                                <TablePage
                                    history={props.history}
                                    match={props.match}
                                    location={props.location}
                                    server={API_URL}
                                />
                            )
                        }}/>
                    )}
                    {["/transaction/:value",
                        "/block/:value",
                        "/account/:value"].map(path =>
                        <Route key={path} path={path} render={(props) => {
                            return(
                                <ItemPage
                                    history={props.history}
                                    match={props.match}
                                    location={props.location}
                                    server={API_URL}
                                />
                            )
                        }}/>
                    )}
                </Switch>
            </div>
        )
    }
}

export default AppRouter;
