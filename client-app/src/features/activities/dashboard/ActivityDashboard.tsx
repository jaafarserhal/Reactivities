import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Container, Grid, GridColumn } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityList from './ActivityList';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ActivityFilters from './ActivityFilters';

export default observer(function ActivityDashboard() {
    const {activityStore} = useStore();
    const {loadActivities,activityRegistry} = activityStore
    useEffect(() => {
       if (activityRegistry.size <= 1) loadActivities();
    },[activityRegistry.size,loadActivities])
  

  if (activityStore.loadingInitial) return <LoadingComponent content= 'Loading app'/>
    return(
        <Container style={{marginTop:'7em'}}>
        <Grid>
                    <Grid.Column width='10'>
                    <ActivityList/>
                    </Grid.Column>
                    <GridColumn width='6'>
                        <ActivityFilters/>
                    </GridColumn>
                </Grid>
        </Container>
    )
})