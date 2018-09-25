import React from 'react';
import DataRow from "../../displayComponents/DataRow";
import { Paper } from 'material-ui';
import { isMobile } from 'react-device-detect';

const Account = props => (
    <div>
    <Paper style={{margin: isMobile? '0' : '.6em', padding: '2em'}}>
        <h4 style={{marginTop: '0', textTransform: 'capitalize'}}>{props.title}</h4>
        <h5 style={{marginBottom: '2em'}}>{props.data.address}</h5>
        {Object.keys(props.data).filter(key => props.data.key !== null && key !== "contractId" && key !== "address").map(item => (
            <DataRow
                valueId={props.match.params.value}
                location={props.location}
                history={props.history}
                key={item}
                valueKey={item}
                value={props.data[item]}
            />
        ))}
    </Paper>
    </div>
);

export default Account;
