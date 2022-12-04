import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function BackPage(props) {
    const navigate = useNavigate()
    const { t, i18n } = useTranslation('common');
    return (
        <div className='container'>
            <a onClick={() => { navigate(-1) }}>{t('BACK_BUTTON')}</a>
        </div>
    )
}