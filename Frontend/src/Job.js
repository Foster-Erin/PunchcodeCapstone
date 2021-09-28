import React, { useState } from 'react';
// import { Card, Badge, Button } from 'react-bootstrap';
import './JobCard.css';

export default function Job({ job }) {
  // const [open, setOpen] = useState(false);

  return (
    //import npm i react markdown to convert markdown to react code if necessary (after badges)//
    <main>
      <div className="jobCardWrapper">
      <section className='card-container grid mb-3'>
        <div id="cardBody">
          <div className='align-items-center'>
            <div>
              <div id="cardTitle">
                {job.title} -{' '}
                <span className='text-muted font-weight-light'>
                  {job.company.display_name}
                </span>
              </div>
              <div id="cardSubtitle" className='text-muted mb-2'>
                {job.salary_min}
              </div>
              <div variant='secondary' className='badge'>
                {' '}
                {job.category.label}{' '}
              </div>



              
              <button variant='secondary' className='badge'>
              <span class="badge bg-dark"></span>
                {' '}
                {job.location.area}
                {' '}
              </button>
              <div style={{ wordBreak: 'break-all' }}>
                {job.id.redirect_url}
              </div>
            </div>
          </div>
  
        <div className="descriptionBox">
        
            <div id="jobDescription">{job.description}</div>
            <a href={job.redirect_url} target='_blank' rel='noreferrer'>
              <button id="applyButton">APPLY NOW</button>
            </a>
          </div>
          
        </div>
      </section>
      </div>
    </main>
  );
}
