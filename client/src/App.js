import React, { useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Nav from "./Pages/Nav";


function App() {


const [channels, setChannels] = useState([]);
const getAllChannels = () =>{
  axios.get(`${process.env.REACT_APP_API}/channels`)
  .then(response =>{
    console.log(response);
    setChannels(response.data)
  })
  .catch(error=> {
    console.log(error)
    alert("Error while fetching channels")
  })
}

useEffect(() => {
  getAllChannels()
},[]);

const deleteConfirm = slug => {
  let conf = window.confirm("Are you sure ytou want to delet this post");
  if(conf){
    deletePost(slug)
  }
}

const deletePost = (slug) => {
  axios.delete(`${process.env.REACT_APP_API}/channels/${slug}`)
  .then(response =>{
    alert(response.data.message)
    getAllChannels();
  })
  .catch(err=>{
    console.log(err);
    alert("channel not deleted")
  })
}

  return (

    <div className=" container ">
    <Nav/>
    <br/>
    {
      channels.map((channel,index) =>{
        return(
          <div className="row" key={channel._id} style={{ borderBottom:'1px solid black' }}>
              <div className="col-lg-10 pt-2 pb-2">
                <Link to={`/${channel.slug}`}><h2>{channel.channel_name}</h2></Link>
                <p><h3>Spent: <span>${channel.spent_in_usd}</span></h3></p>
                <p><h3>Views <span className="badge"> {channel.views}</span></h3></p>
                <p> Published on <span className="badge">{new Date(channel.date).toLocaleString()}</span></p>
              </div>
              <div className = "col-lg-2 pt-2 pb-2"> 
                <Link to ={`/channels/update/${channel.slug}`} className="btn btn-sm btn-outline-warning">
                  Update
                </Link>
                <button onClick = {()=>deleteConfirm(channel.slug)} className ="btn btn-sm btn-outline-danger ml-1">Delete</button>
              </div>
          </div>
        )
      })
    }
    </div>
    
  );
}

export default App;
