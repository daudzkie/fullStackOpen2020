import React from 'react'
import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = () => {
  // const [value, setValue] = useState('')
  const dispatch = useDispatch()

  const handleChange = (event) => {
    // props.filterChange(props.filter)

    const filter = event.target.value
    console.log(filter)
    dispatch(filterChange(filter))
  }

  const style = {
    marginBottom:10
  }

  return (
    <div style={style}>
            filter
      <input
        name="filter"
        onChange={handleChange}
      />
    </div>
  )
}

export default Filter

// const mapDispatchToProps = dispatch => {
//   return {
//     filterChange: (filter) => { dispatch({ type: 'SET_FILTER', filter: filter })}
//   }
// }

// export default connect(
//   null,
//   mapDispatchToProps
// )(Filter)