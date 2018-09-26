import React, { Component } from 'react';
import SearchError from "../displayComponents/SearchError";
import {Redirect} from "react-router-dom";
import { API_SEARCH_ENDPOINT } from '../config';
import Scrollbar from '../displayComponents/Scrollbar';
import LoadingSection from '../displayComponents/LoadingSection';

class SearchItemPage extends Component {
    state = {
        type: {},
        query: {},
        data: {},
        error: false,
        loading: true
    }

    componentWillMount() {
        const query = this.props.match.params.query;
        this.search(query);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.location.key !== nextProps.location.key) {
            const query = nextProps.match.params.query
            this.search(query);
        }
    }

    async search(query) {
        try {
            const response = await fetch(`${API_SEARCH_ENDPOINT}${query}`);
            const json = await response.json();
            if(json.result){
                this.setState({
                    type: json.type,
                    query: query,
                    data: json,
                    error: false,
                    loading: false
                });
            }else {
                this.setState({
                    query: query,
                    data: json.error,
                    error: true,
                    loading: false
                })
            }
        } catch (error){
            console.log(error);
        }
 
    }

    render() {
        return (
            <Scrollbar>
                <div style={{textAlign: "center", padding: '1em'}}>
                    {this.state.loading?
                        <div style={{marginTop: '5em'}}>
                            <LoadingSection />
                        </div>
                    :
                        <React.Fragment>
                            {this.state.error?
                                <div>
                                    <SearchError query={this.state.query} hashError={this.state.data !== 'Invalid query'}/>
                                </div>
                            :
                                <Redirect
                                    push={false}
                                    to={{pathname: '/' + this.state.type + '/' + this.state.query, state: { data: this.state.data }}}
                                />
                            }
                        </React.Fragment>
                    }
                </div>
            </Scrollbar>
        )

    }
}

export default SearchItemPage;