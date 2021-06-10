import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Nav from './Nav';
import DateTimePicker from 'react-datetime-picker';




const UpdateChannel = (props) => {
    const [state, setState] = useState({
        channel_name: "",
        views: "",
        spent_in_usd: "",
        slug :""
    });
    const { channel_name, views, spent_in_usd, slug } = state;

    const [date, setDate] = useState('');

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/channels/${props.match.params.slug}`)
            .then(response => {
                console.log(response);
                const { channel_name, views, spent_in_usd, date,slug } = response.data;
                setState({ ...state, channel_name, views, spent_in_usd,slug })
                setDate(date)
            })
            .catch(err => {
                alert("error loading post")
            })
    }, []);

    const changeHandler = name => event => {
        // console.log('name',name,'value',event.target.value);
        setState({ ...state, [name]: event.target.value })
    }
    const dateHandler = (event) =>{
        console.log(event);
        setDate(event);
    }

    const submitHandler = event =>{
        console.table({channel_name,views,spent_in_usd,date,slug});
        event.preventDefault();

        axios.put(`${process.env.REACT_APP_API}/channels/${slug}`,{channel_name,views,spent_in_usd,date})
        .then(response=>{
            console.log(response);
            const {channel_name,views,spent_in_usd,date} = response.data
            setState({...state,channel_name,views,spent_in_usd})
            setDate(date)
            alert(`post titled: ${channel_name} is updated`)
        })
        .catch(error=>{
            console.log(error.response);
            alert(error)
        })
    }

    return (
        <div className=" container pb-5">
            <Nav />
            <h1>Update Channel : {channel_name}</h1><br />
            <form onSubmit={submitHandler}>
                <div className=" form-group">
                    <label className=" text-muted">Channel Name</label>
                    <input type="text" onChange={changeHandler('channel_name')} value={channel_name} className="form-control" placeholder="Enter Channel Name" required />
                </div>
                <div className=" form-group">
                    <label className=" text-muted">Views</label>
                    <input type="number" onChange={changeHandler('views')} value={views} className="form-control" placeholder="Enter View Count" required />

                </div>
                <div className=" form-group">
                    <label className=" text-muted">Amount Spent</label>
                    <input type="number" onChange={changeHandler('spent_in_usd')} value={spent_in_usd} className="form-control" placeholder="Enter Amount" required />
                </div>
                <div className=" form-group">
                    <label className=" text-muted">Date Published</label>
                    <DateTimePicker onChange={dateHandler} value={date} />
                </div>
                <div>
                    <button className=" btn btn-primary">Update</button>
                </div>
            </form>

        </div>
    )
}

export default UpdateChannel;
