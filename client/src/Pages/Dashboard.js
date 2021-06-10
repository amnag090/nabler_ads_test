import React,{useState,useEffect} from 'react';
import { Bar } from 'react-chartjs-2';
import Nav from '../Pages/Nav';
import axios from 'axios';

const data = {
  labels: [],
  datasets: [
    {
      label: '',
      data: [],
      borderWidth: 1,
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const Dashboard = () => {

  const [channels, setChannels] = useState("");
  const [data_channel_view, setDataChannelView] = useState({
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
        backgroundColor: [],
        borderColor: [
        ],
        borderWidth: 1,
      },
  ],
  });

  const getAllChannels = () =>{
    axios.get(`${process.env.REACT_APP_API}/channels/dashboard/channelViews`)
    .then(response =>{
      console.log(response);
      setDataChannelView(response.data)
    })
    .catch(error=> {
      console.log(error)
      alert("Error while fetching channels")
    })
  }

  useEffect(() => {
    getAllChannels();
  }, []);
 
  
    return (
      <div className='container pb-5'>
      <Nav/>
      <div className='row'>
        <div className="col-6">
          <Bar data={data_channel_view} options={options} />
        </div>
        <div className="col-6">
          {/* <Bar data={data2} options={options} /> */}
        </div>
      </div>
    </div>
    )
  
};

export default Dashboard;