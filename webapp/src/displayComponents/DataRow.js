import React from 'react';
import DataLink from '../displayComponents/DataLink';
import Grid from './Grid';
import GridItem from './GridItem';
import LogRow from './LogRow';
import { isEdge } from 'react-device-detect';
import web3 from 'web3';
import { Tooltip } from 'material-ui';

class DataRow extends React.Component {

    state = {
        ascii: false
    }

    toggleAscii = () => {
        const ascii = this.state.ascii;

        this.setState({
            ascii: !ascii
        });
    }

    render (){
        const _renderValue = () => {
            const { value } = this.props;
            if (this.props.valueKey && value !== null) {
                const key = this.props.valueKey;
                if (key === "transactions") {
                    if (this.props.location.pathname.includes("block")) {
                        return this.props.value === 0? '0 transactions' :
                            <span>
                                <DataLink
                                    valueId={this.props.valueId}
                                    history={this.props.history}
                                    type='blockTransactions'
                                >
                                    {this.props.value}
                                </DataLink> {`transaction${this.props.value > 1? 's' : ''}`}
                            </span>
                    } else {
                        return this.props.value === 0? '0 transactions' :
                            <span>
                                <DataLink
                                    valueId={this.props.valueId}
                                    history={this.props.history}
                                    type='accountTransactions'
                                >
                                    {this.props.value}
                                </DataLink> {`transaction${this.props.value > 1? 's' : ''}`}
                            </span>;
                    }
                }

                if (key === "blockNumber" || key === "blockHash" ||  key === "parentHash") {
                    return <DataLink
                        history={this.props.history}
                        type='block' >
                        {this.props.value}
                    </DataLink>
                }
                if(key === "to" || key === "from" || key === "address") {
                    return <DataLink
                        history={this.props.history}
                        type='account' >
                        {this.props.value}
                    </DataLink>
                }

                if(key === "contractAddress") {
                    return (
                        <span>
                            Contract <DataLink
                            history={this.props.history}
                            type='account' >
                            {this.props.value}
                            </DataLink> created
                        </span>
                    )
                }

                if (key === "transactionHash" || key === "creationTransaction") {
                    return <DataLink
                        history={this.props.history}
                        type='transaction' >
                        {this.props.value}
                    </DataLink>
                }

                if(key === 'logs' || key === 'cbx_data'){
                    if(!value){
                        return '-';
                    }

                    if(Array.isArray(value) && value.length === 0){
                        return '-';
                    }

                    return (
                        <React.Fragment>
                            {value.map((log, index) => (
                                <LogRow key={`log_${index}`} log={log} index={index} />
                            ))}
                        </React.Fragment>
                    )
                }

                if(key === 'input'){
                    return (
                        <Tooltip title={this.state.ascii? 'Click to convert to Hex' : 'Click to convert to ASCII'}>
                            <div onClick={this.toggleAscii}>
                                {this.state.ascii?
                                    web3.utils.hexToAscii(value)
                                :
                                    value
                                }
                            </div>
                        </Tooltip>
                    )
                }

                if (key === 'committedSeals' || key === 'validators'){
                    if(!Array.isArray(value)){
                        let processedValue = value.slice(1);
                        processedValue = processedValue.slice(0, -1);
                        const items = processedValue.split(',');
                        return items.map((item, index) => <div key={`${key}_${index}`} style={{marginTop: '0.3em'}}>{`${item.replace(/\'/g, '')}`}</div>);
                    }
                    return value.map((item, index) => <div key={`${key}_${index}`} style={{marginTop: '0.3em'}}>{`${item.replace(/\'/g, '')}`}</div>);
                }

                if(Array.isArray(value)){
                    if(value.length === 0){
                        return '-';
                    }
                }
                return value;
            }
        }

        return (
            <Grid style={{padding: '0.5em'}} className="hoverable">
                <GridItem xs={3} md={2}><strong>{this.props.valueKey === 'contractAddress'? 'to' : this.props.valueKey}</strong>: </GridItem>
                <GridItem style={{overflowWrap: "break-word"}} xs={12} md={10}>{_renderValue()}</GridItem>
            </Grid>
        )
    }
}

export default DataRow;
