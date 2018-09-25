import React from 'react';

const SearchError = props => {
    return (
        <div>
            {props.hashError?
                `The hash ${props.query} does not match any block, transaction or account.`
            :
                'Invalid query'
            }
        </div>
    );
}

export default SearchError;
