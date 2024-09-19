import {BsFilterRight} from 'react-icons/bs'
import './index.css'

const ProductsHeader = props => {
 
    const {sortbyOptions,activeOptionId,updateActiveOptionId} =props 

    const onChangeOptions = event =>{
        updateActiveOptionId(event.target.value)

    }

    return (
        <div className='container'>
            <h1>AllProduct</h1>
            <div className='sub-container'>
            <BsFilterRight className="sort-by-icon" />
            <h1 className="sort-by">Sort by</h1>
                <select onChange={onChangeOptions} value={activeOptionId}>
                    {sortbyOptions.map(eachItem => (
                        <option
                        key ={eachItem.optionId}
                        value={eachItem.optionId}
                        
                        >
                            {eachItem.displayText}
                            </option>
                    ))}
                    

                </select>

            </div>

        </div>
    )

}

export default ProductsHeader