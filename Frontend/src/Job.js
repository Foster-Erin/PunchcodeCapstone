import React, { useState } from 'react';
// import { Card, Badge, Button } from 'react-bootstrap';
import './Job.css';

export default function Job({ job }) {
  // const [open, setOpen] = useState(false);

  return (
    //import npm i react markdown to convert markdown to react code if necessary (after badges)//
      // <div className="jobCardWrapper">
      // <section className='card-container grid'>
        <div className="cardBody grid">
          <div className='align-items-center'>
            <div>
              <div id="cardTitle">
                {job.title} -{' '}
                <span className='font-weight-bold'>
                  {job.company.display_name}
                </span>
              </div>
              <div className='cardSubtitle'>
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
  
        
            <div id="jobDescription" className="hide">{job.description}</div>
            <a href={job.redirect_url} target='_blank' rel='noreferrer' className='apply'>
              <button id="applyButton">APPLY NOW</button>
            </a>
          
        </div>
      // </section>
      // </div>
  );
}
