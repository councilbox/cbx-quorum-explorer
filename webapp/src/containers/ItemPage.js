import React from 'react';
import Block from "../components/Blocks/Block";
import Account from "../components/Accounts/Account";
import Transaction from "../components/Transactions/Transaction";
import LoadingSection from '../displayComponents/LoadingSection';
import { API_BLOCK_ENDPOINT, API_ACCOUNT_ENDPOINT, API_TRANSACTION_ENDPOINT } from '../config';
import Scrollbar from '../displayComponents/Scrollbar';

class ItemPage extends React.Component {
    state = {
        title: "",
        data: [],
        loading: true,
        hasError: false,
        showingPayload: false
    }

    componentDidMount(){
        if(this.props.match.params.value) {
            if(this.props.location.state !== undefined) {
                this.handleRedirectData(this.props.location.state.data)
            } else {
                this.handleRequestType(this.props.match.params.value)
            }
        }
    }

    componentDidUpdate(prevProps){
        if(this.props.location.key !== prevProps.location.key) {
            this.setState({
                loading: true
            })
            this.handleRequestType(this.props.match.params.value)
        }
    }


    handleRedirectData = data => {
        let title = data.type.charAt(0).toUpperCase() + data.type.slice(1);
        this.setState( {
            title: title,
            data: data.result,
            loading: false
        })
    }

    handleRequestType = query => {
        this.setState({
            loading: true
        })
        if (this.props.history.location.pathname.includes('transaction')) {
            this.sendRequest(query, API_TRANSACTION_ENDPOINT)
        } else if (this.props.history.location.pathname.includes('block')) {
            this.sendRequest(query, API_BLOCK_ENDPOINT)
        } else if (this.props.history.location.pathname.includes('account')) {
            this.sendRequest(query, API_ACCOUNT_ENDPOINT)
        }
    }

    async sendRequest(query, endpoint) {
        const response = await fetch(`${endpoint}${query}`);
        const json = await response.json();
        if(!json.error){
            this.setState({
                title: json.type,
                data: json.result,
                loading: false
            })
        } else {
            this.setState({
                title: json.type,
                data: json.error.message,
                hasError: true,
                loading: false
            });
        }
    }

    render() {
        return (
            <Scrollbar>
                <div style={{padding: '1em'}}>
                    {(this.state.loading === false && this.state.data)?
                        <React.Fragment>
                            {this.state.hasError?
                                <div style={{textAlign: "center"}}>{this.state.data}</div>
                            :
                                <React.Fragment>
                                    {this.props.history.location.pathname.includes("block") &&
                                        <Block
                                            title={this.state.title}
                                            data={this.state.data}
                                            match={this.props.match}
                                            location={this.props.location}
                                            history={this.props.history}
                                            server={this.props.server}
                                        />
                                    }
                                    {this.props.history.location.pathname.includes("account") &&
                                        <Account
                                            title={this.state.title}
                                            data={this.state.data}
                                            match={this.props.match}
                                            location={this.props.location}
                                            history={this.props.history}
                                            server={this.props.server}
                                        />
                                    }

                                    {this.props.history.location.pathname.includes("transaction") &&
                                        <Transaction
                                            title={this.state.title}
                                            data={this.state.data}
                                            match={this.props.match}
                                            location={this.props.location}
                                            history={this.props.history}
                                            server={this.props.server}
                                        />
                                    }
                                </React.Fragment>
                            }
                        </React.Fragment>
                    :
                        <div style={{margin: '5em'}}>
                            <LoadingSection />
                        </div>
                    }
                </div>
            </Scrollbar>
        );
    }
}


export default ItemPage;