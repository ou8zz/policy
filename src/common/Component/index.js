/**
 * Created by sunfengyan on 2017/12/4.
 */
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export default class Component extends React.Component {

  constructor(props) {
    super(props)
  }

  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
  };

  classNames(...args) {
    return classnames(args)
  }

  className(...args) {
    return this.classNames([...args, this.props.className])
  }

  style(args) {
    return { ...args, ...this.props.style }
  }

}
