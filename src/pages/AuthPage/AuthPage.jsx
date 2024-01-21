import {useState, useEffect} from 'react'
import SignUpForm from '../../components/SignUpForm/SignUpForm'
import * as rijksAPI from '../../utilities/rijks-api'
import Marquee from "react-fast-marquee";


export default function AuthPage({ setUser }) {
    const [showSignUp, setShowSignUp] = useState(false)
    const [images, setImages] = useState([])

    useEffect(() => {
        const getHomeImages = async () => {
            const results = await rijksAPI.search('bird',30,1)
            setImages(results.curData)
        }
        getHomeImages().catch(err => console.log(err));
    }, [])

    return (
        <main>
            <div className='form-container'>
                <div className='logo'><img alt='art collector logo' src="/ART-COLLECTOR.png"></img></div>
                <Marquee speed={100} style={{overflow: 'hidden'}}>
                    {images.map((image) => {
                        return (<div style={{margin: '0 12px'}}><img style={{height: '300px'}} alt={image.title} src={image.primaryImage}/></div>)
                    })}
                </Marquee>
                {showSignUp && <SignUpForm setUser={setUser} setShowSignUp={setShowSignUp} />}
            </div>
        </main>
    )
}