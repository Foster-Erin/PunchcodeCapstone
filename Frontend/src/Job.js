import React from 'react';
import './Job.css';
import './Glass.css';

export default function Job({ job }) {
  return (
    <div className='cardBody grid glass'>
      <div className='align-items-center'>
        <div>
          <div className='cardTitle'>
            {job.title} -{' '}
            <span className='font-weight-bold'>{job.company.display_name}</span>
          </div>
          <div className='cardSubtitle'>{job.salary_min}</div>
          <div variant='secondary' className='badge'>
            {' '}
            {job.category.label}{' '}
          </div>

          <button variant='secondary' className='badge'>
            <span class='badge bg-dark'></span> {job.location.area}{' '}
          </button>
          <div style={{ wordBreak: 'break-all' }}>{job.id.redirect_url}</div>
        </div>
      </div>

      <div className='jobDescription'>{job.description}</div>
      <a
        href={job.redirect_url}
        target='_blank'
        rel='noreferrer'
        className='apply'
      >
        <button id='applyButton'>APPLY NOW</button>
      </a>
    </div>
  );
}
