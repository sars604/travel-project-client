import React, { Fragment } from 'react'
import './Home.scss'

const airplane = require('./css/airplane2.jpg')
const bus = require('./css/orange-bus.jpg')

const Home = () => (
  <Fragment>
    <div className='home-box'><div className='images'><img className="airplane" src={airplane} title="airplane" /><img className="bus" src={bus} title="bus" /></div>
      <h3><em>“Man cannot discover new oceans unless he has the courage to lose sight of the shore.”</em><br /><span className='cite'> – Andre Gide</span></h3>
    </div>
  </Fragment>
)

export default Home
