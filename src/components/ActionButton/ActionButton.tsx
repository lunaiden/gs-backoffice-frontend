import './ActionButton.css'

interface ButtonProps {
    buttonVariant: string;
    children: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
}

export const ActionButton = ({ buttonVariant, children, onClick, type}: ButtonProps) => {
    return (
    <button type={`${type ? type : 'button'}`} className={`action-button ${buttonVariant} ${buttonVariant === 'link' ? '' : 'rectangle'}`} onClick={onClick}>{children}</button>
        )
};