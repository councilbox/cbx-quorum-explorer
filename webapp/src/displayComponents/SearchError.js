import React from 'react';

const SearchError = props => {
    return (
        <div style={{width: '100%', display: 'flex', justifyContent: 'center', paddingTop: '5em'}}>
            {props.hashError?
                `The hash "${props.query}" does not match any block, transaction or account.`
            :
                'Invalid query'
            }
        </div>
    );
}

export default SearchError;
