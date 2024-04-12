import '../css/convertButton.css';

export default function ConvertButton({ title, click }) {
    return (
        <button className="button tracking-widest hover:scale-[1.1]"
            onClick={click}
        >
            {title}
        </button>
    )
}




