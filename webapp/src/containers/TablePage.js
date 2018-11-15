import React from 'react';
import BlocksTable from "../components/Blocks/BlocksTable";
import TransactionsTable from "../components/Transactions/TransactionsTable";
import Footer from '../components/Footer';
import LoadingSection from '../displayComponents/LoadingSection';
import { Card } from 'material-ui';
import { API_BLOCKS_ENDPOINT, API_TRANSACTIONS_ENDPOINT, LIMIT } from '../config';
import { isMobile } from 'react-device-detect';
import withWindowSize from '../HOCs/withWindowSize';
import { lightGrey } from '../styles/colors';

class TablePage extends React.Component {

    state = {
        title: '',
        data: [],
        loading: true,
        loadingMore: false,
        count: 25,
    }

    scrollbar = null;

    async componentDidMount(){
        this.refresh();
    }

    refresh = async () => {
        let endpoint = API_TRANSACTIONS_ENDPOINT;
        if(this.props.location.pathname.includes('blocks')){
            endpoint = API_BLOCKS_ENDPOINT;
            this.setState({
                title: 'Blocks'
            })
        } else {
            this.setState({
                title: 'Transactions'
            })
            if (this.props.history.location.pathname.includes("block")) {
                endpoint = `${endpoint}?block=${this.props.match.params.value}`
            } else if (this.props.history.location.pathname.includes("account")) {
                endpoint = `${endpoint}?address=${this.props.match.params.value}`
            }
        }
        const response = await fetch(endpoint);
        const json = await response.json();
        if(json.result.data){
            this.setState({
                data: json.result.data,
                loading: false
            });
        }
    }

    loadMore = async () => {
        let endpoint = API_TRANSACTIONS_ENDPOINT;

        if(this.props.location.pathname.includes('blocks')){
            endpoint = API_BLOCKS_ENDPOINT;
        } else {
            if (this.props.history.location.pathname.includes("block")) {
                endpoint = `${endpoint}?block=${this.props.match.params.value}`
            } else if (this.props.history.location.pathname.includes("account")) {
                endpoint = `${endpoint}?address=${this.props.match.params.value}`
            }
        }
        const response = await fetch(`${endpoint}?from=${this.state.data[this.state.data.length - 1].number}&limit=${LIMIT}`);
        const json = await response.json();
        if(json.result.data){
            this.setState({
                data: [...this.state.data, ...json.result.data],
                loading: false
            });
        }
    }



    _renderContent = () => {
        if (this.props.location.pathname.includes('blocks')) {
            return (
                <BlocksTable
                    key="blocks"
                    title={this.state.title}
                    maxPage={this.state.maxPage}
                    data={this.state.data}
                    page={this.state.page}
                    loadMore={this.loadMore}
                    history={this.props.history}
                    location={this.props.location}
                />
            )

        } else if (this.props.location.pathname.includes('transactions')) {
            return (
                <TransactionsTable
                    key="transactions"
                    title={this.state.title}
                    maxPage={this.state.maxPage}
                    data={this.state.data}
                    loadMore={this.loadMore}
                    page={this.state.page}
                    history={this.props.history}
                    location={this.props.location}
                />
            )
        }
    }

    render() {
        if(this.state.error){
            return (
                <div style={{width:'100%', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                    <i className="material-icons" style={{color: 'red', fontSize: '5em'}}>
                        error
                    </i>
                    <div style={{fontSize: '1.6em', color: 'red', fontWeight: '700'}}>
                        {this.state.error}
                    </div>
                </div>
            );
        }
        if (this.state.loading) return <LoadingSection />;

        return (
            <div style={{height: '100%', width: '100%', padding: isMobile? 0 : '1.6em', paddingBottom: 0}}>
                <Card {...(isMobile? { elevation: 0 } : {})} style={{padding: '0', marginBottom: '1em', clear: 'both', height: isMobile? '100%' : 'calc(100% - 2.5em)', backgroundColor: isMobile? lightGrey : 'white'}}>
                    <div style={{height: this.props.windowSize === 'xs'? '100%' : '100%', width: '100%', maxWidth: '100%'}}>
                        {this._renderContent()}
                        {this.state.loadingMore &&
                            <LoadingSection color="secondary" />
                        }
                    </div>
                </Card>
                <Footer />
            </div>
        )
    }
}


export default withWindowSize(TablePage);