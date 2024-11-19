import logo from '../Assets/log.png'
import '../Styles/Banner.css'


function Banner() {
    const title = 'CheckMe!'
    return (
        <div className='lmj-banner'>
           
                <img src={logo} alt='La maison jungle' className='lmj-logo' />
                <h1 className='lmj-title'>{title}</h1>
        
        </div>
        
    )
}

export default Banner