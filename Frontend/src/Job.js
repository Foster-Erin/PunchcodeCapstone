import React, { useState } from 'react';
import { Card, Badge, Button, Collapse } from 'react-bootstrap';

export default function Job({ job }) {
  const [open, setOpen] = useState(false);

  return (
    //import npm i react markdown to convert markdown to react code if necessary (after badges)//
    <main>
      <Card className='mb-3'>
        <Card.Body>
          <div className='d-flex justify-content-between'>
            <div>
              <Card.Title>
                {job.title} -{' '}
                <span className='text-muted font-weight-light'>
                  {job.company.display_name}
                </span>
              </Card.Title>
              <Card.Subtitle className='text-muted mb-2'>
                {job.salary_min}
              </Card.Subtitle>
              <Badge variant='secondary' className='mr-2'>
                {' '}
                {job.category.label}{' '}
              </Badge>
              <Badge variant='secondary'> {job.location.area} </Badge>
              <div style={{ wordBreak: 'break-all' }}>
                {job.id.redirect_url}
              </div>
            </div>
          </div>
          <Card.Text>
            <Button
              onClick={() => setOpen((prevOpen) => !prevOpen)}
              variant='primary'
            >
              {open ? 'Hide Details' : 'View Details'}
            </Button>
            <a href={job.redirect_url} target='_blank' rel='noreferrer'>
              <Button>APPLY NOW</Button>
            </a>
          </Card.Text>
          <Collapse in={open}>
            <div className='mt-4'>
              {/* <ReactMarkdown source={job.description} /> */}
              {job.description}
            </div>
          </Collapse>
        </Card.Body>
      </Card>
    </main>
  );
}
