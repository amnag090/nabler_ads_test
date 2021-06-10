import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Nav from './Nav';



const SingleChannel = (props) =>{
    const [channel, setChannel] = useState({})
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/channels/${props.match.params.slug}`)
        .then(response =>{
            console.log(response);
            setChannel(response.data)
        })
        .catch(err=>{
            alert("error loading channel")
        })
    }, []);
    return(
        <div className="container pb-5">
            <Nav/><br/>
            <h1>Name: {channel.channel_name}</h1>
            <h1>Views: {channel.views}</h1>
            <h1>Spent: ${channel.spent_in_usd}</h1>
            <p> Published on <span className="badge">{new Date(channel.createdAt).toLocaleString()}</span></p>
        </div>
    )
}

export default SingleChannel