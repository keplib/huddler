import React, { useEffect, useState } from 'react';
import Second from './Second';
import Third from './Third';
import Welcome from './Welcome';

function MainForm() {
    const [page, setPage] = useState(1);
    const [fn, setFn] = useState('')
    const [ln, setLn] = useState('')
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState<string[]>([])

    const handleTag = (tag: string) => {
        setTags(tags => [...tags, tag])
    }
    useEffect(() => {
        
    }, [ln, fn])
    

    const nextPage = (e) => {
        e.preventDefault()
        if (page < 3) {
            setPage(page + 1);
        }
    }
    const prevPage = (e) => {
        e.preventDefault()
        if (page > 1) {
            setPage(page - 1);
        }
    }

    const handleSubmit = () => {
        console.log(description);
        console.log(ln);
        console.log(fn);
        console.log(tags);
        console.log('sub')
    }

    return (
        <div className='flex items-center flex-col py-8'>
            <h1>{page}/3</h1>
            <div className='bg-yellow-200 h-[60vh] w-full flex justify-center'>
                {page == 1 ? <Welcome handleTag={handleTag} /> :
                    (page == 2) ? <Second description={description} setDescription={setDescription}
                        firstName={fn} setFirstName={setFn} lastName={ln} setLastName={setLn} /> :
                        <Third handleSubmit={handleSubmit} />
                }
            </div>
            <div className='flex gap-10 self-'>
                <button onClick={(e) => prevPage(e)} className='px-6 py-2 bg-blue-500 text-white'>prev</button>
                <button onClick={(e) => nextPage(e)} className='px-6 py-2 bg-blue-500 text-white'>next</button>
            </div>
        </div>
    );
}

export default MainForm;
