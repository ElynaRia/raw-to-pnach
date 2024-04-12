import '../css/OptionsButton.css';

export default function OptionsButton({ click }) {
    return (
        <button className="setting-btn" onClick={click}>
            <span className="bar bar1"></span>
            <span className="bar bar2"></span>
            <span className="bar bar1"></span>
        </button>
    )
}
