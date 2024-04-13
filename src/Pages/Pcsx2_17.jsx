import React, { useEffect, useRef, useState } from 'react'
import DateCreated from './../Components/DateCreated';
import '../css/scroll.css';
import '../css/convertButton.css';
import CopyButton from '../Components/CopyButton';
import ContextMenu from '../Components/ContextMenu';
import FileSaver from 'file-saver';
import SaveButton from '../Components/SaveButton';
import ConvertButton from '../Components/ConvertButton';

export default function Pcsx2_17() {
    const showHide = useRef(null);
    const TypeButton = useRef(null);
    const crcInput = useRef(null);
    const textareaInput = useRef(null);
    const [crc, setcrc] = useState("edit this text to crc")
    const [type, settype] = useState(',extended,');
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


    function CreateFile() {
        const OPSI = new Blob([valueHasil || "--- OUTPUT KOSONG --- \nTIDAK ADA RAW CODE UNTUK DI CONVERT \nSILAHKAN MASUKAN RAW CODE DENGAN BENAR PADA INPUT"], { type: "text/plain;charset=utf-8" });
        FileSaver.saveAs(OPSI, `${crc}.pnach`);
    }


    function convert() {
        const get = valuesumber.toUpperCase().trim().split("\n");
        const regex = /^([A-F0-9]{12}) ([A-F0-9]{8})$/;

        // map
        const mapping = get.map(x => {
            if (x.match(regex)) {
                TypeButton.current.style.display = "flex";
                return "patch=1,EE," + x.match(regex)[1].replace(/([A-F0-9]{5})/, "2") + type + x.match(regex)[2];
            }
            else {
                if (String(get) === "") {
                    return "// INPUT MASIH KOSONG"
                } else {
                    return "// INPUT SALAH";
                }
            }
        })
        setvalueHasil(mapping.join("\n"));
        setscrollTextarea(getScroll);
    }



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
        document.title = "Cheat Engine To Pcsx2 v1.7";
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
                        icon={
                            <svg className="w-6 h-6 text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-6 5h6m-6 4h6M10 3v4h4V3h-4Z" />
                            </svg>

                        }
                        click={() => {
                            navigator.clipboard.readText()
                                .then(text => {
                                    if (text == "") {
                                        textareaInput.current.placeholder = "Clipboard Masih Kosong"
                                    } else {
                                        textareaInput.current.value += text
                                        setvaluesumber(textareaInput.current.value);
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
                            textareaInput.current.placeholder = "Masukan Raw Code Kesini \nexample:\n7FF800123456 FFFFFFFF \n7FF800654321 00000000";
                        }}
                    >Hapus</ListContextMenu>
                </ContextMenu >
            </span >
            <div className='text-center relative inset-x-0 inset-y-0'
                onClick={() => { showHide.current.style.display = "none"; }}
            >
                <DateCreated />
                <textarea className=' placeholder:tracking-widest outline-none shadow-lg shadow-emerald-600 focus:shadow-blue-600 duration-200 m-3 mt-10 w-[80%] max-[520px]:w-[90%] bg-gray-600 rounded p-2 text-white uppercase h-auto'
                    onChange={(e) => { setvaluesumber(e.target.value); e.target.style.height = e.target.scrollHeight + 'px'; setgetScroll(e.target.scrollHeight + 'px') }}
                    onPaste={(e) => { setvaluesumber(e.target.value); e.target.style.height = e.target.scrollHeight + 'px'; setgetScroll(e.target.scrollHeight + 'px') }}
                    placeholder={'Masukan Raw Code Kesini \nexample:\n7FF800123456 FFFFFFFF \n7FF800654321 00000000'}
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

                <div className='mt-5 text-center w-full flex justify-center'>
                    <ConvertButton title={"CONVERT"} click={convert} />
                </div>

                <div className='w-[80%] max-[520px]:w-[90%] m-3 mt-20 mr-auto ml-auto relative'>
                    <span className='absolute left-0 top-[-45px] w-52 text-white justify-between items-center h-10 p-1 gap-3 max-[520px]:w-44'
                        style={{ display: "none" }}
                        ref={TypeButton}
                    >
                        <span className='p-2 rounded ml-[-4px] cursor-pointer bg-emerald-600 hover:bg-emerald-800 w-28 max-[520px]:w-20 text-center'
                            onClick={() => {
                                settype(",extended,");
                                const get = valuesumber.toUpperCase().trim().split("\n");
                                const regex = /^([A-F0-9]{12}) ([A-F0-9]{8})$/;

                                // map
                                const mapping = get.map(x => {
                                    if (x.match(regex)) {
                                        TypeButton.current.style.display = "flex";
                                        return "patch=1,EE," + x.match(regex)[1].replace(/([A-F0-9]{5})/, "2") + type + x.match(regex)[2];
                                    }
                                    else {
                                        if (String(get) === "") {
                                            return "// INPUT MASIH KOSONG"
                                        } else {
                                            return "// INPUT SALAH";
                                        }
                                    }
                                })
                                setvalueHasil(mapping.join("\n"));
                                setscrollTextarea(getScroll);
                            }}
                        >extended</span>
                        <span className='p-2 rounded ml-[-4px] cursor-pointer bg-emerald-600 hover:bg-emerald-800 w-28 max-[520px]:w-20 text-center'
                            onClick={() => {
                                settype(",word,");
                                const get = valuesumber.toUpperCase().trim().split("\n");
                                const regex = /^([A-F0-9]{12}) ([A-F0-9]{8})$/;

                                // map
                                const mapping = get.map(x => {
                                    if (x.match(regex)) {
                                        TypeButton.current.style.display = "flex";
                                        return "patch=1,EE," + x.match(regex)[1].replace(/([A-F0-9]{5})/, "2") + type + x.match(regex)[2];
                                    }
                                    else {
                                        if (String(get) === "") {
                                            return "// INPUT MASIH KOSONG"
                                        } else {
                                            return "// INPUT SALAH";
                                        }
                                    }
                                })
                                setvalueHasil(mapping.join("\n"));
                                setscrollTextarea(getScroll);
                            }}
                        >word</span>
                    </span>
                    <span className='absolute right-20 top-[-50px] scale-[1.4] max-[520px]:scale-[1.2] max-[520px]:top-[-47px] max-[520px]:right-16'>
                        <SaveButton click={() => { crcInput.current.style.display = "block" }} />
                    </span>
                    <span className='absolute right-2 top-[-50px] scale-[1.4] max-[520px]:scale-[1.2] max-[520px]:top-[-47px]'>
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
                    <section className='fixed inset-x-0 inset-y-0' style={{ backgroundColor: "rgba(0, 0, 0,0.8)", display: "none" }} ref={crcInput}>
                        <span className='absolute right-2 top-2 border-2 border-red-400 rounded-lg cursor-pointer w-14 h-14 flex justify-center items-center hover:bg-red-700' onClick={() => { crcInput.current.style.display = "none"; }}>
                            <svg className="w-10 h-10 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                            </svg>
                        </span>
                        <div className='text-white rounded-lg bg-emerald-800 absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-80 h-44 text-start p-3'>
                            <span className='font-semibold tracking-wider mt-3 inline-block' style={{ fontStyle: "oblique" }}>nama file untuk disimpan</span>
                            <input type="text" maxLength={8} className='uppercase w-full mt-1 rounded outline-none text-black font-semibold p-2' placeholder='CRC CODE IN HERE' onChange={(e) => { setcrc(e.target.value) }} onPaste={(e) => { setcrc(e.target.value) }} />
                            <button
                                onClick={CreateFile}
                                className='flex justify-center items-center gap-3 uppercase mt-3 rounded h-10 w-full bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%'
                            >Download <span><svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M13 11.15V4a1 1 0 1 0-2 0v7.15L8.78 8.374a1 1 0 1 0-1.56 1.25l4 5a1 1 0 0 0 1.56 0l4-5a1 1 0 1 0-1.56-1.25L13 11.15Z" clipRule="evenodd" />
                                <path fillRule="evenodd" d="M9.657 15.874 7.358 13H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2.358l-2.3 2.874a3 3 0 0 1-4.685 0ZM17 16a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z" clipRule="evenodd" />
                            </svg>
                                </span></button>
                        </div>
                    </section>
                </div >
            </div>
        </>
    )
}
