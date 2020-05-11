import React from 'react'
import { Part1, Part2, Part3 } from './'

class Content extends React.Component {
    
    render() {
    console.log(this.props.part1)
    console.log(this.props.exercises1)
        return (
            <div>
                <Part1 part1={this.props.part1} ex1={this.props.exercises1} />
                <hr />
                <Part2 part2={this.props.part2} ex2={this.props.exercises2} />
                <hr />
                <Part3 part3={this.props.part3} ex3={this.props.exercises3} />
                <hr />

                {/* <h2>Part 1: {this.props.part1}</h2>
                <h2># of exercises: {this.props.exercises1}</h2>
                <hr />
                <h2>Part 2: {this.props.part2}</h2>
                <h2># of exercises: {this.props.exercises2}</h2>
                <hr />
                <h2>Part 3: {this.props.part3}</h2>
                <h2># of exercises: {this.props.exercises3}</h2>
                <hr /> */}
            </div>
        )
    }
}

export default Content