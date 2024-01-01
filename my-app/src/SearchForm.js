import React from 'react'
import { Form, Col,Button } from 'react-bootstrap'

 function SearchForm({ params, onParamChange }) {
  return (
  //    <Form className="mb-4">
  //    <Form.Row>
  //      <Form.Group as={Col}>
  //        <Form.Label>query</Form.Label>
  //        <Form.Control onChange={onParamChange} value={params.query} name="query" type="text" />
  //      </Form.Group>
  //    </Form.Row>
  //  </Form>
  <Form className='mb-4'>
    <Form.Group as={Col}>
<Form.Control onChange={onParamChange} value={params.query} name="query" type="text" />
{/* <Button variant="primary" type="submit" className='mt-3' onClick={onParamChange} >Search</Button> */}
    </Form.Group>
  </Form>

  ) 
}
export default SearchForm



