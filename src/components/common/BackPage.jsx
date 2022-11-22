import { useNavigate } from "react-router-dom";

export default function BackPage(props) {
    const navigate = useNavigate()
    return (
        <div className='container'>
            <a onClick={() => { navigate(-1) }}>Back</a>
        </div>
    )
}