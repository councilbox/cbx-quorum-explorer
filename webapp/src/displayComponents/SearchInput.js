import React from 'react';
import TextInput from '../displayComponents/TextInput';

class SearchWidget extends React.Component {

    state = {
        searchValue: ''
    }

    pushSearch = () => {
        if(this.state.searchValue) {
            this.props.history.push("/search/" + this.state.searchValue);
        }
    }

    handleEnter = e => {
        if (e.keyCode === 13) {
            this.pushSearch();
        }
    }

    render() {
        return (
            <div style={{width: '100%'}}>
               <TextInput
                    fullWidth
                    onKeyUp={this.handleEnter}
                    adornment={<i className="material-icons" onClick={this.pushSearch} style={{cursor: 'pointer'}}>search</i>}
                    value={this.state.searchValue}
                    onChange={event =>
                        this.setState({
                            searchValue: event.target.value
                        })
                    }
                />
            </div>
        )
    }
}

export default SearchWidget;
