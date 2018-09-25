import React from 'react';
import DataRow from "../../displayComponents/DataRow";
import { Paper } from 'material-ui';
import { isMobile } from 'react-device-detect';
import { overflowText } from '../../styles/commonStyles';

const Block = props => (
    <div>
        <Paper style={{margin: isMobile? '0' : '.6em', padding: '2em'}}>
            <h4 style={{marginTop: '0', textTransform: 'capitalize'}}>{props.title} #{props.data.number}</h4>
            <h5 style={{marginBottom: '2em', ...overflowText}}>{props.data.hash}</h5>
            {Object.keys(props.data).filter(key => key !== "hash" && key !== "number").map(key => (
                <DataRow
                    valueId={props.match.params.value}
                    location={props.location}
                    history={props.history}
                    key={key}
                    valueKey={key}
                    value={props.data[key]}
                />
            ))}
        </Paper>
    </div>
)

export default Block;
