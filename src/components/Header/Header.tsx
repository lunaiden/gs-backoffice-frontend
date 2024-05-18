import './Header.css';
import {ActionButton} from "../ActionButton/ActionButton.tsx";
interface HeaderProps {
    title: string;
    buttonText?: string;
    buttonVariant?: string;
    buttonAction?: () => void;
}

export const Header = ({title, buttonText, buttonVariant, buttonAction}: HeaderProps) => {

return (
    <div className='header'>
        <h1>{title}</h1>
        {(buttonText && buttonVariant) &&
            <ActionButton buttonVariant={buttonVariant} onClick={buttonAction}>{buttonText}</ActionButton>}
    </div>
)
};