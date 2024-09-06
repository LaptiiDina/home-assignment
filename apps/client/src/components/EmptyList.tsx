import { EmptyListProp } from "../types/type"


export const EmptyList:React.FC<EmptyListProp>=(props)=>{
    return (
        <>      
        <div>
        <div style={{display: 'flex',justifyContent: 'center'}}> 
           <h1>Books do not exist, please add book</h1></div>
            <div style={{display: 'flex',justifyContent: 'center'}}>
             <button style={{width: '30%'}} onClick={props.handleClickAddBook}>add book</button>
        </div>
    </div>
    </>
    )
}