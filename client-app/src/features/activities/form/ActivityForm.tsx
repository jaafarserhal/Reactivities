import React,{useState,ChangeEvent} from 'react';
import { Segment,Form, Button } from 'semantic-ui-react';

interface Props {
    activity:Activity | undefined;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
}
export default function ActivityForm({activity:selectedActivity,closeForm,createOrEdit}:Props) {
    const intialState = selectedActivity ??  {
      id: '',
      title:  '',
      date:  '',
      descriptio: '',
      category: '',
      city:  '',
      venue:  '',
    }
    const [activity,setActivity] = useState(intialState);

    function handleSubmit() {
        createOrEdit(activity);
    }

    function handleInputChange(event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name,value} = event.target;
        setActivity({...activity,[name]:value})
    }
    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete = 'off'>
                <Form.Input placeholder = 'Title' value = {activity.title} name="title" onChange = {handleInputChange}/>
                <Form.TextArea placeholder = 'Description' value = {activity.descriptio} name="descriptio" onChange = {handleInputChange}/>
                <Form.Input placeholder = 'Category'  value = {activity.category} name="category" onChange = {handleInputChange}/>
                <Form.Input placeholder = 'Date' value = {activity.date} name="date" onChange = {handleInputChange}/>
                <Form.Input placeholder = 'City' value = {activity.city} name="city" onChange = {handleInputChange}/>
                <Form.Input placeholder = 'Venue' value = {activity.venue} name="venue" onChange = {handleInputChange}/>
                <Button floated='right' positive type='submit' content= 'Submit'/>
                <Button onClick={closeForm} floated='right' type='button' content= 'Cancel'/>
            </Form>
        </Segment>
    )
}