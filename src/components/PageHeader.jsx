import './PageHeader.css'

export default function PageHeader({title}) {
    return (
        <div className='container page-header'>
            <h3>{title}</h3>
            <hr />
        </div>
    )
}