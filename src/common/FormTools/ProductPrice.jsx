import * as React from 'react'
import isArray from 'lodash/isArray'

export const ProductPrice = (props) => {
  const { productSpecs } = props

  return (
    <div>
      {
        !isArray(productSpecs)
          ? '无'
          : productSpecs.map((item, index) => (
            <div
              key={`${String(index)}`}
              style={{ textAlign: 'center' }}
            >
              <p> { item.name }: ￥{ item.price } </p>
              <br />
            </div>
          ))
      }
    </div>
  )
}
