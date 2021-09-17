import React from 'react'
import { Card, Badge } from 'react-bootstrap';

export default function Job({ job }) {
    return (
                   //import npm i react markdown to convert markdown to react code if necessary (after badges)//
        <Card>
            <div className="d-flex justify-content-between">
                <div>   
                   <Card.Title>
                   {job.title} - <span className="text-muted font-weight-light">
                       {job.company}</span> 
                   </Card.Title> 
                   <Card.Subtitle className="text-muted mb-2">
                       {new Date(job.created_at).toLocaleDateString()}
                   </Card.Subtitle>
                   <Badge variant="secondary" className="mr-2">{job.type}</Badge>
                   <Badge variant="secondary">{job.location}</Badge>
                   <div style={{wordBreak: 'break-all'}}>
                       <ReactMarkdown source={job.how_to_apply}/>
                   </div>
                </div>
            <img className="d-none d-md-block" height="50" src={job.company_logo} alt={job.company}/>
            
            </div>
        <Card.Body>

        </Card.Body>
        </Card>
        
    )
}
