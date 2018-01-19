import PropTypes from 'prop-types';
import React, { Component, isValidElement } from 'react';
import ReactDOM from 'react-dom';

import { ModalShell } from 'linode-components';


class PortalModal extends Component {
  constructor(props) {
    super(props);
    this.selector = document.getElementById('portal-modal');
  }

  getPropFromChildren(prop) {
    const { children } = this.props;
    if (Array.isArray(children)) {
      const activeChild = children.find(child => !!child);
      return activeChild.props && activeChild.props[prop];
    } else if (typeof(children) === 'object') {
      return children.props && children.props[prop];
    }
  }

  getCloseFromChildren() {
    return (
      this.getPropFromChildren('close') ||
      this.getPropFromChildren('onClose') ||
      this.getPropFromChildren('onCancel')
    );
  }

  activeChild() {
    const { children } = this.props;
    if (Array.isArray(children)) {
      const activeChildren = children.filter(child => !!child);
      if (activeChildren.length > 1) {
        return null;
      }
      return isValidElement(activeChildren[0]) ? activeChildren[0] : null;
    } else if (typeof(children) === 'object') {
      return isValidElement(children) ? children : null;
    }
  }

  render() {
    const activeChild = this.activeChild();
    if (!activeChild) {
      throw new Error('PortalModal must have exactly one child (the Modal body)');
    }

    const title = this.getPropFromChildren('title');
    const close = this.getCloseFromChildren();

    return ReactDOM.createPortal(
      <ModalShell
        open /* close the modal by not rendering the PortalModal */
        title={title}
        close={close}
        {...this.props}
      />,
      this.selector
    );
  }
}

PortalModal.propTypes = {
  children: PropTypes.any.isRequired,
};

export default PortalModal;
