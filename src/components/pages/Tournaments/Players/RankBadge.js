import React, { Component } from 'react';

class RankBadge extends Component {
    render() {
        const p = this.props;
        const { value } = p;
        if (!value) return;

        return (
            // Implementa la lógica para tener TOP5, TOP3, 1ST o nada. 
            <span className={'RankBadge' + p.value}>TOP5</span>
            
        )
    }
}

export default RankBadge;