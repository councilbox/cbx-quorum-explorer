import React from 'react';

const SearchError = props => {
    return (
        <div style={{width: '100%', display: 'flex', justifyContent: 'center', paddingTop: '5em'}}>
            {`The value "${props.query}" does not match any block, transaction or account.`}
        </div>
    );
}

export default SearchError;
