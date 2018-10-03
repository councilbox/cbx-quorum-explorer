import React from 'react';
import DataLink from "../../displayComponents/DataLink";
import { overflowText } from '../../styles/commonStyles';
import { format } from 'date-fns';
import { DATE_FORMAT } from '../../config';
import { Paper } from 'material-ui';
import Grid from '../../displayComponents/Grid';
import GridItem from '../../displayComponents/GridItem';
import { isMobile } from 'react-device-detect';

const TransactionRow = props => {
    const to = props.data.to === null? "Contract creation"
        :
        <DataLink
            history={props.history}
            type='account' >
            {props.data.to}
        </DataLink>
    ;


    return (
        <Grid style={{margin: 'auto', width: '98%'}} className="hoverable">
            {isMobile?
                <Paper style={{marginBottom: '0.9em', width: '100%'}}>
                    <Grid style={{margin: 0, width: '100%', padding: '0.6em'}}>
                        <GridItem xs={5} md={5} lg={5} style={{fontWeight: '700'}}>
                            Date time
                        </GridItem>
                        <GridItem xs={7} md={7} lg={7}>
                            {format(new Date(props.data.timestamp * 1000), DATE_FORMAT)}
                        </GridItem>
                        <GridItem xs={5} md={5} lg={5} style={{fontWeight: '700'}}>
                            Transaction hash
                        </GridItem>
                        <GridItem xs={7} lg={7} md={7}>
                            <DataLink
                                history={props.history}
                                type='transaction' >
                                {props.data.hash}
                            </DataLink>
                        </GridItem>
                        <GridItem xs={5} md={5} lg={5} style={{fontWeight: '700'}}>
                            From
                        </GridItem>
                        <GridItem xs={7} lg={7} md={7}>
                            <DataLink
                                history={props.history}
                                type='account' >
                                {props.data.from}
                            </DataLink>
                        </GridItem>
                        <GridItem xs={5} md={5} lg={5} style={{fontWeight: '700'}}>
                            To
                        </GridItem>
                        <GridItem xs={7} lg={7} md={7}>
                            {to}
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
                            type='transaction' >
                            {props.data.hash}
                        </DataLink>
                    </GridItem>
                    <GridItem xs={3} md={3} lg={3} style={{display: 'flex', justifyItems: 'center', padding: '0.8em', borderBottom: '1px solid gainsboro', paddingLeft: '1.2em'}}>
                        <DataLink
                            history={props.history}
                            type='account' >
                            {props.data.from}
                        </DataLink>
                    </GridItem>
                    <GridItem xs={3} md={3} lg={3} style={{display: 'flex', justifyItems: 'center', padding: '0.8em', borderBottom: '1px solid gainsboro', paddingLeft: '1.2em'}}>
                        {to}
                    </GridItem>
                </React.Fragment>
            }
        </Grid>
    );
}

export default TransactionRow;
