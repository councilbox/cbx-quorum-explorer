import React from 'react';
import { overflowText } from '../../styles/commonStyles';
import Grid from '../../displayComponents/Grid';
import DataLink from '../../displayComponents/DataLink';
import GridItem from '../../displayComponents/GridItem';
import { format } from 'date-fns';
import { DATE_FORMAT } from '../../config';
import { Paper } from 'material-ui';
import { isMobile } from 'react-device-detect';

const BlockRow = props => {

    const transactionCount = () => (
        props.data.transactions === 0? 0 :
            <DataLink
                history={props.history}
                type='blockTransactions'
                valueId={props.data.number} >
                {props.data.transactions}
            </DataLink>
    )

    return (
        <Grid style={{margin: 'auto', width: '98%'}}>
            {isMobile?
                <Paper style={{marginBottom: '0.9em'}}>
                    <Grid style={{margin: 0, width: '100%', padding: '0.6em'}}>
                        <GridItem xs={5} md={5} lg={5} style={{fontWeight: '700'}}>
                            Date time
                        </GridItem>
                        <GridItem xs={7} md={7} lg={7}>
                            {format(new Date(props.data.timestamp * 1000), DATE_FORMAT)}
                        </GridItem>
                        <GridItem xs={5} md={5} lg={5} style={{fontWeight: '700'}}>
                            Block number
                        </GridItem>
                        <GridItem xs={7} lg={7} md={7} style={overflowText}>
                            <DataLink
                                history={props.history}
                                type='block' >
                                {props.data.number.toLocaleString()}
                            </DataLink>
                        </GridItem>
                        <GridItem xs={5} md={5} lg={5} style={{fontWeight: '700'}}>
                            Block hash
                        </GridItem>
                        <GridItem xs={7} lg={7} md={7} style={overflowText}>
                            <DataLink
                                history={props.history}
                                type='block'>
                                {props.data.hash}
                            </DataLink>
                        </GridItem>
                        <GridItem xs={5} md={5} lg={5} style={{fontWeight: '700'}}>
                            No. of transactions
                        </GridItem>
                        <GridItem xs={7} lg={7} md={7}>
                            {transactionCount()}
                        </GridItem>
                    </Grid>
                </Paper>
            :
                <React.Fragment>
                    <GridItem xs={3} md={3} lg={3} style={{display: 'flex', justifyItems: 'center', padding: '0.8em', borderBottom: '1px solid gainsboro', paddingLeft: '1.2em'}}>
                        {format(new Date(props.data.timestamp * 1000), DATE_FORMAT)}
                    </GridItem>
                    <GridItem xs={3} md={3} lg={3} style={{...overflowText, display: 'flex', justifyItems: 'center', padding: '0.8em', borderBottom: '1px solid gainsboro', paddingLeft: '1.2em'}}>
                        <DataLink
                            history={props.history}
                            type='block' >
                            {props.data.number.toLocaleString()}
                        </DataLink>
                    </GridItem>
                    <GridItem xs={3} md={3} lg={3} style={{...overflowText, display: 'flex', justifyItems: 'center', padding: '0.8em', borderBottom: '1px solid gainsboro', paddingLeft: '1.2em'}}>
                        <DataLink
                            history={props.history}
                            type='block' >
                            {props.data.hash}
                        </DataLink>
                    </GridItem>
                    <GridItem xs={3} md={3} lg={3} style={{display: 'flex', justifyItems: 'center', padding: '0.8em', borderBottom: '1px solid gainsboro', paddingLeft: '1.2em'}}>
                        {transactionCount()}
                    </GridItem>
                </React.Fragment>
            }
        </Grid>

    )
}

export default BlockRow;
