import React, { useState } from 'react'
import axios from 'axios';
import Nav from './Nav';



const Create_Channel = () => {


    const [state, setState] = useState({
        channel_name: "",
        views: 0,
        spent_in_usd: 0
    });

    const { channel_name, views, spent_in_usd } = state

    const changeHandler = name => event => {
        // console.log('name',name,'value',event.target.value);
        setState({ ...state, [name]: event.target.value })
    }

    const submitHandler = event =>{
        // console.table({title,content,user});
        event.preventDefault();

        axios.post(`${process.env.REACT_APP_API}/channels`,{channel_name,views,spent_in_usd})
        .then(response=>{
            console.log(response);
            setState({...state,channel_name:'',views:'',spent_in_usd:""})
            alert(`post titled: ${response.data.channel_name} is created`)
        })
        .catch(error=>{
            console.log(error.response);
            alert(error)
        })
    }



    return (
        <div className=" container pb-5">
            <Nav/>
            <h1>Create Channel</h1><br />
            <form onSubmit={submitHandler}>
                <div className=" form-group">
                    <label className=" text-muted">Channel Name</label>
                    <input type="text" onChange={changeHandler('channel_name')} value={channel_name} className="form-control" placeholder="Enter Channel Name" required />
                </div>
                <div className=" form-group">
                    <label className=" text-muted">Views</label>
                    <input type="number" onChange={changeHandler('views')} value={views} className="form-control" placeholder="Enter Channel Name" required />

                </div>
                <div className=" form-group">
                    <label className=" text-muted">Amount Spent</label>
                    <input type="number" onChange={changeHandler('spent_in_usd')} value={spent_in_usd} className="form-control" placeholder="Enter Amount" required />
                </div>
                <div>
                    <button className=" btn btn-primary">Create</button>
                </div>
            </form>

        </div>
        )
};

export default Create_Channel