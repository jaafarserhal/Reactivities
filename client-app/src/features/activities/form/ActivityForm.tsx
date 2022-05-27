import { observer } from 'mobx-react-lite';
import React,{useState,ChangeEvent, useEffect} from 'react';
import { useParams,useNavigate, Link  } from 'react-router-dom';
import { Segment,Form, Button } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';


export default observer(function ActivityForm() {
    const {activityStore} = useStore();
    const {loadActivity,createActivity,updateActivity,loading,loadingInitial} = activityStore;
    const {id} = useParams<{id: string}>();
    const navigate = useNavigate();
    const [activity,setActivity] = useState({
        id: '',
        title:  '',
        date:  '',
        descriptio: '',
        category: '',
        city:  '',
        venue:  '',
    });


   useEffect(()=> {
       if (id)  loadActivity(id).then(activity => setActivity(activity!))
   },[id,loadActivity])

    function handleSubmit() {
      if(activity.id.length === 0) {
          let newActivity = {
              ...activity,id:uuid()
          };
          createActivity(newActivity).then(() => {
            navigate(`/activities/${newActivity.id}`)
          });
      } else{
        updateActivity(activity).then(() => {
            navigate(`/activities/${activity.id}`)
          });
      }
    }

    function handleInputChange(event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name,value} = event.target;
        setActivity({...activity,[name]:value})
    }

    if(loadingInitial) return <LoadingComponent content='Loading activity...' />
    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete = 'off'>
                <Form.Input placeholder = 'Title' value = {activity.title} name="title" onChange = {handleInputChange}/>
                <Form.TextArea placeholder = 'Description' value = {activity.descriptio} name="descriptio" onChange = {handleInputChange}/>
                <Form.Input placeholder = 'Category'  value = {activity.category} name="category" onChange = {handleInputChange}/>
                <Form.Input type="date" placeholder = 'Date' value = {activity.date} name="date" onChange = {handleInputChange}/>
                <Form.Input placeholder = 'City' value = {activity.city} name="city" onChange = {handleInputChange}/>
                <Form.Input placeholder = 'Venue' value = {activity.venue} name="venue" onChange = {handleInputChange}/>
                <Button  loading={loading} floated='right' positive type='submit' content= 'Submit'/>
                <Button  as={Link} to='/activities' floated='right' type='button' content= 'Cancel'/>
            </Form>
        </Segment>
    )
})