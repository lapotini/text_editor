import React from 'react';
import classes from './TextControls.css';

const textControls = (props) => {
  return (
    <div className={classes.TextControls}>
      <div className={[classes.B, classes.Control_btn, props.activeButtons.b ? classes.active : '', props.disabled ? classes.disabled : ''].join(' ')}
           onClick={() => props.changeTextStyle('b')}>B</div>
      <div className={[classes.I, classes.Control_btn, props.activeButtons.i ? classes.active : '', props.disabled ? classes.disabled : ''].join(' ')}
           onClick={() => props.changeTextStyle('i')}>I</div>
      <div className={[classes.U, classes.Control_btn, props.activeButtons.u ? classes.active : '', props.disabled ? classes.disabled : ''].join(' ')}
           onClick={() => props.changeTextStyle('u')}>U</div>
    </div>
  )
};

export default textControls;