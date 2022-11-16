import './ProfilePage.css'

/*Needs in props:
 profileImg
 profileName
 profileNick
 backgroundImg
 idVisible : visible | hidden | collapse | inherit
 includeProfileImage : 'hidden'

*/
export default function ProfilePage(props){
    return(
        <div>
            <div className="top-photo col-md-12 ">
                <img src={props.backgroundImg}/>
            </div>
            <div className='profile'>
                <div className='profile-img' style={{display:props.includeProfileImage}}>
                    <img src={props.profileImg} 
                    alt="Circle Image" className="img-raised rounded-circle img-fluid"/>{' '} 
                </div>
                <div className='profile-inf'>
                    <p className='profile-text'>{props.profileName}</p> 
                    <p className='id-text' style={{visibility:props.idVisible}}>@{props.profileNick}</p>
                </div>

            </div>
       </div>
    )
}