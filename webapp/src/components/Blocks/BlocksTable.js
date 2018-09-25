import React from 'react';
import BlockRow from "./BlockRow";
import Grid from '../../displayComponents/Grid';
import GridItem from '../../displayComponents/GridItem';
import Scrollbar from '../../displayComponents/Scrollbar';
import { isMobile } from 'react-device-detect';

class BlocksTable extends React.Component {
    onScrollStop = () => {
        const scrollValues = this.scrollbar.getValues();
        if(scrollValues.top > 0.9){
            this.props.loadMore();
        }
    }

    scrollbar = null;

    render() {
        const { data } = this.props;

        return (
            <div style={{height: '100%'}}>
                {isMobile?
                    <div style={{height: '100%', width: '100%'}}>
                        <Scrollbar
                            ref={scrollbar => this.scrollbar = scrollbar}
                            onScrollStop={this.onScrollStop}
                        >
                            <div style={{padding: '1em', paddingBottom: 0}}>
                                {data.map(element => (
                                    <BlockRow
                                        key={element.number}
                                        history={this.props.history}
                                        data={element}
                                    />
                                ))}
                            </div>
                        </Scrollbar>
                    </div>
                :
                    <React.Fragment>
                        <Grid style={{margin: 0}}>
                            <GridItem xs={3} md={3} lg={3} style={{padding: '1.2em', display: 'flex', alignItems: 'center', borderBottom: '1px solid gainsboro', fontWeight: '700'}}>
                                Date time
                            </GridItem>
                            <GridItem xs={3} md={3} lg={3} style={{padding: '1.2em', display: 'flex', alignItems: 'center', borderBottom: '1px solid gainsboro', fontWeight: '700'}}>
                                Block number
                            </GridItem>
                            <GridItem xs={3} md={3} lg={3} style={{padding: '1.2em', display: 'flex', alignItems: 'center', borderBottom: '1px solid gainsboro', fontWeight: '700'}}>
                                Block hash
                            </GridItem>
                            <GridItem xs={3} md={3} lg={3} style={{padding: '1.2em', display: 'flex', alignItems: 'center', borderBottom: '1px solid gainsboro', fontWeight: '700'}}>
                                No. of transactions
                            </GridItem>
                        </Grid>
                        <div style={{height: 'calc(100% - 3.5em)', width: '100%'}}>
                            <Scrollbar
                                ref={scrollbar => this.scrollbar = scrollbar}
                                onScrollStop={this.onScrollStop}
                            >
                                {data.map(element => (
                                    <BlockRow
                                        key={element.number}
                                        history={this.props.history}
                                        data={element}
                                    />
                                ))}
                            </Scrollbar>
                        </div>
                    </React.Fragment>
                }
            </div>
        );
    }
}

export default BlocksTable;
