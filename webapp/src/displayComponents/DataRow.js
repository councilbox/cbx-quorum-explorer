import React from 'react';
import DataLink from '../displayComponents/DataLink';
import Grid from './Grid';
import GridItem from './GridItem';
import LogRow from './LogRow';

const DataRow = props =>  {
    const _renderValue = () => {
        const { value } = props;
        if (props.valueKey && value !== null) {
            const key = props.valueKey;
            if (key === "transactions") {
                if (props.location.pathname.includes("block")) {
                    return props.value === 0? '0 transactions' :
                        <span>
                            <DataLink
                                valueId={props.valueId}
                                history={props.history}
                                type='blockTransactions'
                            >
                                {props.value}
                            </DataLink> {`transaction${props.value > 1? 's' : ''}`}
                        </span>
                } else {
                    return props.value === 0? '0 transactions' :
                        <span>
                            <DataLink
                                valueId={props.valueId}
                                history={props.history}
                                type='accountTransactions'
                            >
                                {props.value}
                            </DataLink> {`transaction${props.value > 1? 's' : ''}`}
                        </span>;
                }
            }

            if (key === "blockNumber" || key === "blockHash" ||  key === "parentHash") {
                return <DataLink
                    history={props.history}
                    type='block' >
                    {props.value}
                </DataLink>
            }
            if(key === "to" || key === "from" || key === "address") {
                return <DataLink
                    history={props.history}
                    type='account' >
                    {props.value}
                </DataLink>
            }

            if(key === "contractAddress") {
                return (
                    <span>
                        Contract <DataLink
                        history={props.history}
                        type='account' >
                        {props.value}
                        </DataLink> created
                    </span>
                )
            }

            if (key === "transactionHash" || key === "creationTransaction") {
                return <DataLink
                    history={props.history}
                    type='transaction' >
                    {props.value}
                </DataLink>
            }

            if(key === 'logs'){
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
            <GridItem xs={3} md={2}><strong>{props.valueKey === 'contractAddress'? 'to' : props.valueKey}</strong>: </GridItem>
            <GridItem style={{overflowWrap: "break-word"}} xs={12} md={10}>{_renderValue()}</GridItem>
        </Grid>
    )
}

export default DataRow;
