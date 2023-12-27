import React, { useEffect, useReducer } from 'react'
import axios from 'axios'
const ACTIONS={
    MAKE_REQUEST:'make_request',
    GET_DATA:'get_data',
    UPDATE_HAS_NEXT_PAGE:'update_has_next_page',
    ERROR:'error'

}
const base_url='https://jsearch.p.rapidapi.com/search';
const headers={
    'X-RapidAPI-Key': 'f4b8735663mshc281f0aaff3bdf2p192d13jsn6096147407e8',
    'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
  }
function reducer(state,action){
    switch(action.type){
    case ACTIONS.MAKE_REQUEST:
    return{
             loading : true,
             jobs:[]
    }
    case ACTIONS.GET_DATA:
        return {
            ...state,
            loading:false,
            jobs:action.payload.jobs
        }
    case ACTIONS.ERROR:
        return {
            ...state,
            loading:false,
            error:action.payload.error,
            jobs:[]
                }
    case ACTIONS.UPDATE_HAS_NEXT_PAGE:
        return{
            ...state,
                hasNextPage:action.payload.hasNextPage
        }
    default:
        return state
    }
}

export default function UseFetchJobs(page,params) {
    const [state,dispatch]=useReducer(reducer,{loading:true,jobs:[]})
    const cancelToken1=axios.CancelToken.source(); // get cancel token 
    useEffect(()=>{
        dispatch({type:ACTIONS.MAKE_REQUEST})
        axios.get(base_url,{
            cancelToken:cancelToken1.token,
            params: {
                query: 'Python developer in Texas, USA',
                page: `${page}`,
                num_pages:'1' 
              },
            headers: headers
        }).then(res=>{
                dispatch({type:ACTIONS.GET_DATA,payload:{jobs:res.data.data}})
        }).catch(e=>{
            if(axios.isCancel(e)) return   // if we dont use any request dont trouble the situation.
            dispatch({type:ACTIONS.ERROR,payload:{error:e}})
        })
        // ------------------------------ for next page
        const cancelToken2=axios.CancelToken.source(); // get cancel token 

        axios.get(base_url,{
            cancelToken:cancelToken2.token,
            params: {
                query: 'Python developer in Texas, USA',
                page: `${page+1}`,
                num_pages:'1' 
              },
            headers: headers
        }).then(res=>{
                dispatch({type:ACTIONS.UPDATE_HAS_NEXT_PAGE,payload:{hasNextPage:res.data.length!==0}})
        }).catch(e=>{
            if(axios.isCancel(e)) return   // if we dont use any request dont trouble the situation.
            dispatch({type:ACTIONS.ERROR,payload:{error:e}})
        })
        return()=>{
            cancelToken1.cancel();  // clear listening to the server
            cancelToken2.cancel();  // clear listening to the server
        }
    },[page])
    return state
}
