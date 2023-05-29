import {useCallback, useState} from 'react';
import update from 'immutability-helper'
import './BoardShuffle.css';
import BoardShuffleCard from './BoardShuffleCard';

export default function BoardShuffle({ boards }) {
    const [boardOrder, setBoardOrder] = useState(boards)

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        console.log('Before update:', boardOrder);

        setBoardOrder((prevCards) =>
          update(prevCards, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, prevCards[dragIndex]],
            ],
          }),
        );
      
        console.log('After update:', boardOrder);
    }, []);
    
    const renderCard = useCallback((board, index) => {
        return (
          <BoardShuffleCard
            key={board.id}
            order={board.order}
            board={board}
            index={index}
            moveCard={moveCard}
          />
        )
    }, [])

    return (
        <div
            className='shuffle-container'
        >
            {boardOrder.map((board, idx) => renderCard(board, idx))}
        </div>
    );
}
