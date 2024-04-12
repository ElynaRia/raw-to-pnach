import React, { useEffect, useRef, useState } from 'react'
import DateCreated from './../Components/DateCreated';
import '../css/scroll.css';
import CopyButton from '../Components/CopyButton';
import ContextMenu from '../Components/ContextMenu';
import OptionsButton from './../Components/OptionsButton';

export default function Pcsx2_16() {
    const showHide = useRef(null);
    const textareaInput = useRef(null);
    const [valuesumber, setvaluesumber] = useState("");
    const [valueHasil, setvalueHasil] = useState("");
    const [getScroll, setgetScroll] = useState("");
    const [scrollTextarea, setscrollTextarea] = useState("");
    const [position, setPosition] = useState({
        x: 0,
        y: 0
    });
    const [posisi, setposisi] = useState({
        x: 0,
        y: 0
    });



    function convert() {
        const get = valuesumber.trim().split("\n");
        const regex = /([A-F0-9]+) ([A-F0-9]+)/;

        //mapping
        const mapping = get.map(x => {
            if (x.match(regex)) {
                return "patch=1,EE," + x.match(regex)[1] + ",extended," + x.match(regex)[2];
            }
            else {
                return "INPUT SALAH"
            }
        })
        setvalueHasil(mapping.join("\n"));
        setscrollTextarea(getScroll);
    };


    function contextMenu(e) {
        e.preventDefault();
        showHide.current.style.display = "grid";
        setposisi({ x: position.x, y: position.y });
    };


    function ListContextMenu({ click, children, gaya, icon }) {
        return (
            <>
                <button onClick={() => { click(); showHide.current.style.display = "none"; }} className={`relative text-lg font-semibold w-full hover:bg-slate-400 text-left p-2 rounded-sm duration-150 ${gaya}`}>{children} <span className='absolute right-0 opacity-60'>{icon}</span> </button>
            </>
        )
    }


    useEffect(() => {
        document.title = "Cheat Engine To Pcsx2 v1.6";
        document.body.style.backgroundColor = "rgb(36,36,36)";
        document.body.style.overflowX = "hidden";
    }, []);

    return (
        <>
            <span style={{ display: "none", position: 'absolute', left: posisi.x, top: posisi.y, }} ref={showHide}>
                <ContextMenu >
                    <ListContextMenu
                        icon={
                            <svg
                                className="w-6 h-6 text-gray-800 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                fill="black"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7 9v6a4 4 0 0 0 4 4h4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1v2Z"
                                    clipRule="evenodd"
                                />
                                <path
                                    fillRule="evenodd"
                                    d="M13 3.054V7H9.2a2 2 0 0 1 .281-.432l2.46-2.87A2 2 0 0 1 13 3.054ZM15 3v4a2 2 0 0 1-2 2H9v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-3Z"
                                    clipRule="evenodd"
                                />
                            </svg>

                        }
                        click={() => {
                            navigator.clipboard.writeText(textareaInput.current.value)
                                .then(text => {
                                    if (textareaInput.current.value == "") {
                                        textareaInput.current.placeholder = "Text Masih Kosong"
                                    } else {
                                        return true;
                                    }
                                })
                                .catch(() => { alert('browser tidak support'); })
                        }}
                    >Salin</ListContextMenu>
                    <ListContextMenu
                        icon={<svg
                            className="w-6 h-6 text-gray-800 dark:text-black"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 20H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h2.429M7 8h3M8 8V4h4v2m4 0V5h-4m3 4v3a1 1 0 0 1-1 1h-3m9-3v9a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-6.397a1 1 0 0 1 .27-.683l2.434-2.603a1 1 0 0 1 .73-.317H19a1 1 0 0 1 1 1Z"
                            />
                        </svg>
                        }
                        click={() => {
                            navigator.clipboard.readText()
                                .then(text => {
                                    if (text == "") {
                                        textareaInput.current.placeholder = "Clipboard Masih Kosong"
                                    } else {
                                        textareaInput.current.value = text
                                    }
                                })
                                .catch(() => { alert('browser tidak support'); })
                        }}
                    >Tempel</ListContextMenu>
                    <ListContextMenu
                        gaya={'text-red-500 font-bold'}
                        icon={<svg className="w-6 h-6 text-gray-800 dark:text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                        </svg>
                        }
                        click={() => {
                            textareaInput.current.value = "";
                            textareaInput.current.placeholder = "Masukan Raw Code Kesini";
                        }}
                    >Hapus</ListContextMenu>
                </ContextMenu >
            </span >
            <div className='text-center relative inset-x-0 inset-y-0'
                onClick={() => { showHide.current.style.display = "none"; }}
            >
                <DateCreated />
                <textarea className=' placeholder:tracking-widest outline-none shadow-lg shadow-emerald-600 focus:shadow-blue-600 duration-200 m-3 w-[80%] bg-gray-600 rounded p-2 text-white uppercase h-auto'
                    onChange={(e) => { setvaluesumber(e.target.value); e.target.style.height = e.target.scrollHeight + 'px'; setgetScroll(e.target.scrollHeight + 'px') }}
                    onPaste={(e) => { setvaluesumber(e.target.value); e.target.style.height = e.target.scrollHeight + 'px'; setgetScroll(e.target.scrollHeight + 'px') }}
                    placeholder='Masukan Raw Code Kesini'
                    rows={8}
                    ref={textareaInput}
                    onContextMenu={contextMenu}
                    onPointerMove={e => {
                        setPosition({
                            x: e.clientX,
                            y: e.clientY
                        });
                    }}
                >
                </textarea >

                <div className='block'>
                    <button
                        onClick={convert}
                        className='bg-emerald-600 hover:bg-emerald-700 w-44 h-10 rounded mt-5 mb-5 p-2 text-white'
                    >CONVERT</button>
                </div>

                <div className='w-[80%] m-3 mt-20 mr-auto ml-auto relative'>
                    <span className='absolute right-20 top-[-50px] scale-[1.4]'>
                        <OptionsButton click={() => { }} />
                    </span>
                    <span className='absolute right-0 top-[-50px] scale-[1.4]'>
                        <CopyButton Copy={valueHasil} />
                    </span>
                    <textarea
                        value={valueHasil}
                        rows={8}
                        placeholder='HASILNYA DISINI'
                        readOnly={true}
                        style={{ height: scrollTextarea }}
                        className=' placeholder:tracking-widest outline-none shadow-lg shadow-emerald-600 focus:shadow-blue-600 duration-200 w-full bg-gray-600 rounded p-2 text-white'>
                    </textarea>
                    <div className='fixed inset-x-0 inset-y-0 bg-transparent'>
                        <div className="absolute inset-x-10 inset-y-10 bg-black rounded border-2 border-[rgb(255, 255, 255)] text-white">
                            <span className='absolute right-5 top-5 border-2 border-stone-400 w-10 h-10 scale-[1.5] hover:bg-red-700 rounded-md cursor-pointer flex justify-center items-center'><svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                            </svg>
                            </span>
                            <h1 className='text-2xl mt-10'>Pengaturan</h1>
                        </div>
                    </div>
                </div >
            </div>
        </>
    )
}