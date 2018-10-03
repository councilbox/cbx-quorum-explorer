import React from 'react';
import DataRow from "../../displayComponents/DataRow";
import { Paper } from 'material-ui';
import { isMobile } from 'react-device-detect';
import { overflowText } from '../../styles/commonStyles';
import Scrollbar from '../../displayComponents/Scrollbar';

const Block = props => (
    <React.Fragment>
        <Paper style={{margin: isMobile? '0' : '.6em', height: 'calc(100% - 1.5em)'}}>
            <Scrollbar>
                <div style={{padding: '2em'}}>
                    <h4 style={{marginTop: '0', textTransform: 'capitalize'}}>{props.title} #{props.data.number}</h4>
                    <h5 style={{marginBottom: '2em', ...overflowText}}>{props.data.hash}</h5>
                    {Object.keys(props.data).filter(key => key !== "hash" && key !== "number").map(key => (
                        <React.Fragment key={key}>
                            <DataRow
                                valueId={props.match.params.value}
                                location={props.location}
                                history={props.history}
                                valueKey={key}
                                value={props.data[key]}
                            />
                            <div style={{height: '1px', borderBottom: '1px solid gainsboro', marginTop: '0.2em'}} />
                        </React.Fragment>
                    ))}
                </div>
            </Scrollbar>
        </Paper>
    </React.Fragment>
)

export default Block;
