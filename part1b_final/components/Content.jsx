import React from 'react'
import { Part1, Part2, Part3 } from './'

const Content = (props) => {
    
       
    return (
        <div>
            <Part1 parts={props.parts} />
            <Part2 parts={props.parts} />
            <Part3 parts={props.parts} />

        </div>

    )
}

// class Content extends React.Component {
    
//     render() {
//         const [name, exercises] = this.props.parts
        
        
//         return (
//             <div>
//                 <Part1 part1={name} ex1={exercises} />
//                 <hr />
//                 <Part2 part2={this.props.part2} ex2={this.props.exercises2} />
//                 <hr />
//                 <Part3 part3={this.props.part3} ex3={this.props.exercises3} />
//                 <hr />

//                 {/* <h2>Part 1: {this.props.part1}</h2>
//                 <h2># of exercises: {this.props.exercises1}</h2>
//                 <hr />
//                 <h2>Part 2: {this.props.part2}</h2>
//                 <h2># of exercises: {this.props.exercises2}</h2>
//                 <hr />
//                 <h2>Part 3: {this.props.part3}</h2>
//                 <h2># of exercises: {this.props.exercises3}</h2>
//                 <hr /> */}
//             </div>
//         )
//     }
// }

export default Content