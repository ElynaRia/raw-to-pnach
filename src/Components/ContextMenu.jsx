export default function ContextMenu(props) {
    return (
        <>
            <div className='bg-white w-44 rounded p-2 z-20'
                style={props.css}
            >
                {props.children}
            </div>
        </>
    )
}
