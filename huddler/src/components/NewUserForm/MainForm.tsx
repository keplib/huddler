import React, { useEffect, useRef, useState } from 'react';
import UserDetails from './UserDetails';
import Third from './Third';
import Welcome from './Welcome';
import LocationTags from './LocationTags';
import Router from 'next/router';

interface UserData {
    firstName: string;
    lastName: string;
    description: string;
    image: string;
    tags: string[];
}

function MainForm() {
    const [page, setPage] = useState(0);
    const imagesRef = useRef<HTMLInputElement>(null);
    const [imageSelected, setImageSelected] = useState(false);


    const [userData, setUserData] = useState<UserData>({
        firstName: '',
        lastName: '',
        description: '',
        image: '',
        tags: [],
    })

    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        setImageSelected(true);
        if (e.target.files[0]) {
            setUserData({ ...userData, image: URL.createObjectURL(e.target.files[0]) });
        }
        // {...userData, firstName: e.target.value }
        console.log(userData.image);
    };


    const handleTag = (tag: string) => {
        const temp = [...userData.tags, tag];
        console.log(temp);
        setUserData({ ...userData, tags: temp })
    }

    const nextPage = (e) => {
        e.preventDefault()
        if (page < 3) {
            setPage(page + 1);
        } else {
            handleSubmit();
            
        }
    }
    const prevPage = (e) => {
        e.preventDefault();
        if (page > 1) {
            setPage(page - 1);
        }
    }

    const handleSubmit = () => {
        console.log(userData);
        console.log('sub')
        setTimeout(() => {
            Router.push('./home');
        }, 5000)
    }

    return (
        <div className='flex items-center flex-col py-8'>
            <h1>{page}/3</h1>
            <div className='h-[60vh] w-full flex justify-center'>
                {page == 0 ? <Welcome/> :
                page == 1 ? <LocationTags handleTag={handleTag} /> :
                    (page == 2) ? <UserDetails userData={userData} setUserData={setUserData} /> :
                            <Third userData={userData} setUserData={setUserData} imagesRef={imagesRef} onSelectFile={onSelectFile} imageSelected={imageSelected} />
                }
            </div>
            <div className='flex gap-10'>
                {page > 1 && <button onClick={(e) => prevPage(e)} className='px-6 py-2 bg-blue-500 text-white'>prev</button>}
                {page > 2 ? <button onClick={(e) => nextPage(e)} className='px-6 py-2 bg-red-500 text-white'>submit</button>
                : <button onClick={(e) => nextPage(e)} className='px-6 py-2 bg-blue-500 text-white'>next</button>}
            </div>
        </div>
    );
}

export default MainForm;
