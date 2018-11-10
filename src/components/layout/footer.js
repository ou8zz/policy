import React from 'react'
import styles from './main.less'
import util from '../../utils'

const { config } = util

const Footer = () => <div className={styles.footer}>
  {config.footerText}
</div>
export default Footer
