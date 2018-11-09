import * as React from 'react'
import isArray from 'lodash/isArray'

export const ProductPurchasedNum = (props) => {
  const { purchasedNumType, record } = props

  const obj = {
    children: {},
    props: {},
  }

  if (purchasedNumType === 'single') {
    const singleObj = obj
    if (isArray(record.productSpecs)) {
      singleObj.children = (
        <div>
          {
            record.productSpecs.map((item, index) => (
              <div key={String(index)}>
                <p> {item.name} - 销量: {item.purchasedNum} </p>
                <br />
              </div>
            ))
          }
        </div>
      )
      singleObj.props.colSpan = 1
    } else {
      singleObj.props.colSpan = 0
    }
    return singleObj
  } else {
    const totalObj = obj
    if (isArray(record.productSpecs)) {
      totalObj.children = <p>总销量: { record.purchasedNumTotal }</p>
      totalObj.props.colSpan = 1
    } else {
      totalObj.children = <p> 无销量 </p>
      totalObj.props.colSpan = 2
    }
    return totalObj
  }
}
