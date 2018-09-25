import React from 'react';
import { Link } from 'react-router-dom';

class DataLink extends React.Component {

    createLink = () => {

        if(this.props.type === 'blockTransactions'){
            return `/block/${this.props.valueId}/transactions/1`;
        }

        if(this.props.type === 'accountTransactions'){
            return `/account/${this.props.valueId}/transactions/1`;
        }
        if(this.props.children){
            return `/${this.props.type}/${isNaN(this.props.children)? this.props.children.split('.').join('') : this.props.children}`;
        }

        return '/';
    }

    handleLongData = value => {
        if(!value){
            return;
        }
        if (value.length >= 42) {
            value = value.substr(0, 10) + '...' + value.substr(value.length-10, value.length)
        }
        return value;
    }

    render() {
        return (
            <Link to={this.createLink()}>
                {this.handleLongData(this.props.children)}
            </Link>
        );
    }
}

export default DataLink;
