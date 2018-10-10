import React, { Component } from 'react';
import classes from './TextArea.css';

class TextArea extends Component {
  constructor(props) {
    super(props);
    this.htmlEl = React.createRef();
  }

  change = (originalEvt) => {
    if (!this.htmlEl) return;
    const html = this.htmlEl.current.innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      const evt = {
        ...originalEvt, target: { value: html }
      };
      this.props.onChange(evt);
      this.lastHtml = html;
    }
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.html !== this.htmlEl.current.innerHTML;
  };

  getHtml = () => (
    {__html: `<span>${this.props.html}</span>`}
  );

  render() {
    return (
      <div className={classes.TextArea} onMouseUp={this.props.onSelectText} onClick={() => this.htmlEl.current.focus()}>
        <p ref={this.htmlEl} dangerouslySetInnerHTML={this.getHtml()} contentEditable={true}
           onBlur={this.change}></p>
      </div>
    );
  };
}

export default TextArea;