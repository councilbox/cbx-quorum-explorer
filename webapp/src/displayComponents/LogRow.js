import React from 'react';
import Grid from '../displayComponents/Grid';
import GridItem from '../displayComponents/GridItem';
import { overflowText } from '../styles/commonStyles';

class LogRow extends React.Component {

    _renderTopics = topics => {
        return (
            <React.Fragment>
                {topics.map(topic => (
                    <div style={{marginTop: '5px'}} key={`topic_${topic}`}>
                        {topic}
                        <br />
                    </div>
                ))}

            </React.Fragment>
        )
    }

    render(){
        const { log } = this.props;

        return (
            <div style={{width: '100%'}}>
                {Object.keys(log).map(key => (
                    <Grid style={{marginBottom: '0.3em'}} key={`log_${this.props.index}_${key}`}>
                        <GridItem xs={12} md={2} lg={2} style={overflowText}>
                            {`${key}:`}
                        </GridItem>
                        <GridItem xs={12} md={10} lg={10}>
                            {key === 'topics' || key === 'from' ?
                                this._renderTopics(log[key])
                            :
                                log[key].toString()
                            }
                        </GridItem>
                        <br/>
                    </Grid>
                ))}
            </div>
        )
    }
}


export default LogRow;