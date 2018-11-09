import React from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import eventProxy from 'utils/eventProxy';
import classnames from 'classnames';
import Card from './Card'
const update = require('immutability-helper')

const style = {
  minWidth: 150,
}


@DragDropContext(HTML5Backend)
export default class Container extends React.Component {
  constructor(props) {
    super(props)
    this.moveCard = this.moveCard.bind(this)
    this.state = {
      cards: this.props.cards || [],
    }
  }

  componentWillReceiveProps(nextPorps) {
    if ('cards' in nextPorps) {
      this.setState({
        cards: nextPorps.cards,
      })
    }
  }

  render() {
    const { cards } = this.state
    const { className, showField, removable } = this.props;

    return (
      <div className={classnames({'dragable-panel': true, [className]: !!className})} style={style}>
        {cards.map((card, i) => (
          <Card
            key={card.id}
            id={card.id}
            index={i}
            data={card}
            showField={showField}
            moveCard={this.moveCard}
            removeCard={this.removeCard}
            removable={removable}
          />
        ))}
      </div>
    )
  }

  removeCard = (id) => {
    const { cards } = this.state;
    const { onChange } = this.props;
    const card = cards.find(item => item.id == id);
    this.setState({
      cards: cards.filter(item => item.id !== id),
    }, () => {
      onChange && onChange(this.state.cards, card, 'remove');
      // eventProxy.trigger('cardChanged', this.state.cards);
    })
  };

  moveCard = (dragIndex, hoverIndex) => {
    const { cards } = this.state;
    const { onChange } = this.props;
    const dragCard = cards[dragIndex]
    this.setState(
      update(this.state, {
        cards: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
        },
      })
    , () => {
        onChange && onChange(this.state.cards);
        // eventProxy.trigger('cardChanged', this.state.cards);
      })
  }
}