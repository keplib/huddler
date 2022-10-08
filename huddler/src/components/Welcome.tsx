import React, { useState } from 'react'

function Welcome() {

    const [page, setPage] = useState(1)

    const Page = (num: number) => {
        setPage(page + num);
    }
    return (
        <div className='w-[600px] h-auto min-h-[400px] bg-yellow-200 flex flex-col justify-around gap-4 items-center'>
            {page == 1 ?
                <form className= "flex flex-col gap-4">
                    <h1>Form {page}</h1>
                    <input></input>
                    <input></input>
                </form> : page == 2 ?
                
                    <form className="flex flex-col gap-4">
                    <h1>Form {page}</h1>
                    <input></input>
                    <input></input>
                    </form> : <></>}
            
            <div className='flex justify-end gap-8'>
                <button onClick={() => Page(-1)}>Prev</button>
                <button onClick={() => Page(1)}>Next</button>
            </div>
        </div>
    )
}

export default Welcome