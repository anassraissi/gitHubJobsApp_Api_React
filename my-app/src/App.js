import logo from './logo.svg';
import './App.css';
import UseFetchJobs from './UseFetchJobs';
import {Container} from 'react-bootstrap'
import { useState } from 'react';
import Job from './Job';
import PaginationCompo from './PaginationCompo';

function App() {
  const [params,setParams]=useState({});
  const[page,setPage]=useState(1);
  const {jobs,loading,error,hasNextPage}=UseFetchJobs(page,params)
  if(jobs.length>0)console.log(jobs);
  return (

        <Container className='my-3'>
          <h1 className='mb-4'>Jobs by RapidApi(Jsearch)</h1>
          <PaginationCompo page={page} setPage={setPage} hasNextPage={hasNextPage}/>
          {loading && <h1>Loading ...</h1>}
          {error && <h1>Error. Try refreshing</h1>}
          {jobs.length>0 && jobs.map(job => (
             <Job key={job.employer_name} job={job}/>
          ))}
          <PaginationCompo page={page} setPage={setPage} hasNextPage={hasNextPage}/>
        </Container>
  );
}

export default App;
