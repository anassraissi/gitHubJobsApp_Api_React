import React, { useEffect, useReducer } from 'react'
import axios from 'axios'
const ACTIONS={
    MAKE_REQUEST:'make_request',
    GET_DATA:'get_data',
    ERROR:'error'

}
const base_url='https://jsearch.p.rapidapi.com/search';
const headers={
        'X-RapidAPI-Key': '39e27aac35msh8dd4340a385caaep1c6307jsn3e170bb39e4c',
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
    default:
        return state
    }
}

export default function UseFetchJobs(params,page) {
    const [state,dispatch]=useReducer(reducer,{loading:true,jobs:[]})
    const cancelToken=axios.CancelToken.source(); // get cancel token 
    useEffect(()=>{
        dispatch({type:ACTIONS.MAKE_REQUEST})
        axios.get(base_url,{
            cancelToken:cancelToken.token,
            params: {
                query: 'Python developer in Texas, USA',
                page: '1',
                num_pages: '1'
              },
            headers: headers
        }).then(res=>{
                dispatch({type:ACTIONS.GET_DATA,payload:{jobs:res.data.data}})
        }).catch(e=>{
            if(axios.CancelToken(e)) return   // if we dont use any request dont trouble the situation.
            dispatch({type:ACTIONS.ERROR,payload:{error:e}})
        })
        return()=>{
            cancelToken.cancel();  // clear listening to the server
        }
    },[params,page])
    return state
}
