import React, { useState } from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import './JobCard.css';

export default function Job({ job }) {
  const [open, setOpen] = useState(false);

  return (
    //import npm i react markdown to convert markdown to react code if necessary (after badges)//
    <main>
      <div className="jobCardWrapper">
      <Card className='card-container grid mb-3'>
        <Card.Body id="cardBody">
          <div className='d-flex justify-content-between'>
            <div>
              <Card.Title id="cardTitle">
                {job.title} -{' '}
                <span className='text-muted font-weight-light'>
                  {job.company.display_name}
                </span>
              </Card.Title>
              <Card.Subtitle id="cardSubtitle" className='text-muted mb-2'>
                {job.salary_min}
              </Card.Subtitle>
              <Badge variant='secondary' className='badge'>
                {' '}
                {job.category.label}{' '}
              </Badge>
              <Badge variant='secondary' className='badge'>
                {' '}
                {job.location.area}{' '}
              </Badge>
              <div style={{ wordBreak: 'break-all' }}>
                {job.id.redirect_url}
              </div>
            </div>
          </div>
  
        <Card.Text>
        
            {/* <Button
              onClick={() => setOpen((prevOpen) => !prevOpen)}
              variant='primary'
              className='test'
            >
              {open ? 'Hide Details' : 'View Details'}
            </Button> */}
            <div id="jobDescription">{job.description}</div>
            <a href={job.redirect_url} target='_blank' rel='noreferrer'>
              <Button>APPLY NOW</Button>
            </a>
          </Card.Text>
          {/* <Collapse in={open}> */}
            {/* <div className='mt-4'> */}
              {/* <ReactMarkdown source={job.description} /> */}
              {/* {job.description} */}
            {/* </div> */}
          {/* </Collapse> */}
        </Card.Body>
      </Card>
      </div>
    </main>
  );
}
