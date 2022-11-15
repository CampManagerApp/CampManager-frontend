import './ProfilePage.css'

/*Needs in props:
 profileImg
 profileName
 profileNick
 backgroundImg


*/
export default function ProfilePage(props){
    return(
        <div>
            <div className="top-photo col-md-12">
                <img src={props.backgroundImg}/>
            </div>
            <div className='profile'>
                <div className='profile-img'>
                    <img src={props.profileImg} 
                    alt="Circle Image" className="img-raised rounded-circle img-fluid"/>{' '} 
                </div>
                <div className='profile-inf'>
                    <p className='profile-text'>{props.profileName}</p> 
                    <p className='profile-text'>@{props.profileNick}</p>
                </div>

            </div>
       </div>
    )
}