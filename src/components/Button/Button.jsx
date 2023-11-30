import './styles.scss';

function Button({ children, clickHandler, className, isDisabled = false }) {
    return <button disabled={isDisabled} onClick={clickHandler} className={`button ${className}`}>{children}</button>
}

export default Button;