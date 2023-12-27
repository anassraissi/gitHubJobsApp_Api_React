import React, { useState } from 'react'
import { Badge, Button, Card, Collapse } from 'react-bootstrap'
import Markdown from 'react-markdown';

const Job = ({job}) => {
  const[open,setOpen]=useState(false);
 const dateObject = new Date(job.job_posted_at_datetime_utc);
const job_date = dateObject.toISOString().slice(0, 10);
  return (
    <Card className='mb-3'>
    <Card.Body>
      <div className='d-flex jusify-content-between'>
          <div>
            <Card.Title>
              {job.job_title} -<span className='text-muted font-weight-light'> {job.employer_name}</span>
            </Card.Title>
            <Card.Subtitle className='text-muted mb-2'>
                  {job_date}
            </Card.Subtitle>
            <Badge bg='secondary'>Full time</Badge>
            <Badge bg="secondary" className="ms-2">{job.job_city}</Badge>
            <div>
            <div dangerouslySetInnerHTML={{ __html: `<a href="${job.job_apply_link}" class="text-decoration-none">${job.job_apply_link}</a>` }} />

            </div>

          </div>
          <img src={job.employer_logo} className='d-none d-md-block' height='50px' alt={job.employer_name}/>
      </div>
      
      <Card.Text>
        <Button  onClick={()=>setOpen(prevState=>!prevState)}>
          {open ? 'Hide details': 'more details'}
        </Button>
        <Collapse in={open}>
        <div className='mt-4'>
            <p>{job.job_description}</p>
        </div>
        </Collapse>
      </Card.Text>


    </Card.Body>
    </Card>
  )
}

export default Job