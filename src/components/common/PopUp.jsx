import React, { Children } from 'react'

import * as Icons from '../../design/icons.js'
import './PopUp.css'

function PopUp(props) {
  return (props.trigger) ? (
    <div className='popup' >
      <div className="popup-inner" id='inner'>
        {props.children}
      </div>
    </div>
  ) : "";
}

export default PopUp
