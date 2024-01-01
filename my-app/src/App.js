import logo from './logo.svg';
import './App.css';
import UseFetchJobs from './UseFetchJobs';
import {Container} from 'react-bootstrap'
import { useState } from 'react';
import Job from './Job';
import SearchForm from './SearchForm';
import PaginationCompo from './PaginationCompo';

function App() {
  const [params,setParams]=useState({});
  const[page,setPage]=useState(1);
  //
  
  function handelParamChange(e){
    const param=e.target.name;
    const value=e.target.value;
    setPage(1);
    setParams(prevParams=>{
      return {...prevParams,[param]:value}  // declaration vaiable inside object
      //This line is using the spread operator (...) to create a new object that includes all the properties from the current prevParams object.
      //  Then, it adds or updates a property with the name specified by the param variable and sets its value to the value variable.
    })
  }
  console.log(params);
  const {jobs,loading,error,hasNextPage}=UseFetchJobs(page,params)
  if(jobs)console.log(jobs);
  return (

        <Container className='my-3'>
          <h1 className='mb-4'>Jobs by RapidApi(Jsearch)</h1>
          <SearchForm params={params} onParamChange={handelParamChange} />
          <PaginationCompo page={page} setPage={setPage} hasNextPage={hasNextPage} />
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
