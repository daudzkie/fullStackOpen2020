import React from 'react'

class Total extends React.Component {
    render() {
        
        return (
            <div>
                <h1>Total # of exercises: {this.props.exercises1 + this.props.exercises2 + this.props.exercises3}</h1>
            </div>

        )
    }
}

export default Total
