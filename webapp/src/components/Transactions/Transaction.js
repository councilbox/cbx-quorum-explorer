import React from 'react';
import DataRow from "../../displayComponents/DataRow";
import { Paper } from 'material-ui';
import { isMobile } from 'react-device-detect';
import { overflowText } from '../../styles/commonStyles';


const Transaction = props => (
    <React.Fragment>
        <Paper style={{margin: isMobile? '0' : '.6em', padding: '2em'}}>
        <h4 style={{ marginTop: '0', textTransform: 'capitalize'}}>{props.title}</h4>
        <h5 style={{ marginBottom: '2em', ...overflowText}}>{props.data.hash}</h5>
            {Object.keys(props.data).map((key, index) => (
                <DataRow
                    valueId={props.match.params.value}
                    location={props.location}
                    history={props.history}
                    key={`${key}_${index}`}
                    valueKey={key}
                    value={props.data[key]}
                />
            ))}
        </Paper>
    </React.Fragment>
);

export default Transaction;
