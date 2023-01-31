import React from 'react'
import VideoPlayer from './VideoPlayer'
import { Form,Button ,InputGroup,FormControl} from 'react-bootstrap'

function Dashboard() {
  function handleSubmit(e){
    e.preventDefault()
  }
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <FormControl
            type="text"
            placeholder="Type Message"
            required
          />
            <Button type="submit" >send</Button>
        </InputGroup>
      </Form>
      
      <VideoPlayer/>
    </div>
  )
}

export default Dashboard