import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextArea from './TextArea/TextArea';
import TextControls from './TextControls/TextControls';
import classes from './TextEditor.css';

class TextEditor extends Component {
  state = {
    textData: '',
    selectedText: '',
    selectedRange: {},
    selectedTextInfo: {
      b: false,
      i: false,
      u: false
    },
  };

  componentDidMount () {
    this.setState({textData: this.props.value})
  }

  getText = () => {
    const selected = window.getSelection();
    if (selected.toString().length) {
      let b = false, i = false, u = false;
      let selectedRange = selected.getRangeAt(0);

      let el = selectedRange.startContainer;
      while (el.parentNode && el.parentNode.tagName !== "P") {
        switch (el.parentNode.tagName) {
          case 'B':
            b = true;
            break;
          case 'I':
            i = true;
            break;
          case 'U':
            u = true;
            break;
        }
        el = el.parentNode
      }
      this.setState({
        selectedText: selected.toString(),
        selectedRange,
        selectedTextInfo: { b, i, u },
      });
    }
  };

   unwrapText = (wrapper) => {
     let fragment = document.createDocumentFragment();
     while (wrapper.firstChild) {
       let child = wrapper.removeChild(wrapper.firstChild);
       fragment.appendChild(child);
     }
     wrapper.parentNode.replaceChild(fragment, wrapper);
   };

  changeTextStyle = (type) => {
    if (this.state.selectedRange.toString().length) {
      let textState = { ...this.state.selectedTextInfo };

      if (this.state.selectedTextInfo[type]) {
        let elemForUnwrap = this.state.selectedRange.startContainer;
        while (elemForUnwrap.parentNode.tagName !== "P") {
          if (elemForUnwrap.parentNode.tagName.toLowerCase() === type) {
            this.unwrapText(elemForUnwrap.parentNode);
            textState[type] = false;
          }
          elemForUnwrap = elemForUnwrap.parentNode;
        }
      } else {
        let selectedText = this.state.selectedRange.extractContents();
        let el = document.createElement(type);
        el.appendChild(selectedText);
        this.state.selectedRange.insertNode(el);
      }

      let elem = this.state.selectedRange.startContainer;
      while (elem.parentNode.tagName !== "P") {
        elem = elem.parentNode
      }

      this.props.onChange(elem.parentNode.innerHTML);
      this.setState({ textData: elem.parentNode.innerHTML, selectedText: '', selectedTextInfo: textState });
    }
  };

  changeText = (e) => {
    this.props.onChange(e.target.value);
    this.setState({ textData: e.target.value });
  };

  render() {
    const { textData, selectedText, selectedTextInfo } = this.state;

    return (
      <div className={classes.TextEditor}>
        <TextControls changeTextStyle={this.changeTextStyle} disabled={!selectedText.length} activeButtons={selectedTextInfo}/>
        <TextArea html={textData} onSelectText={this.getText} onChange={this.changeText} />
      </div>
    )
  }
}

TextEditor.defaultProps = {
  value: '',
  onChange: ()=>{}
};

TextEditor.propTypes = {
  placeHolder: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextEditor;