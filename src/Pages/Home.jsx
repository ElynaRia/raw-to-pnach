import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import DateCreated from '../Components/DateCreated';

export default function Home() {
    useEffect(() => {
        document.body.style.backgroundColor = "rgb(53, 53, 53)"
    }, []);
    return (
        <>
            <section className='text-white'>
                <DateCreated />
                <h1 className='text-center mt-5 text-2xl font-semibold'>PCSX2 Cheat Converter</h1>
                <p className='text-center'>selamat datang di web gweh</p>
                <div className='w-[75%] max-md:w-[85%] max-sm:w-[95%] bg-emerald-800 mr-auto ml-auto mt-14 p-2 rounded shadow-xl skew-x-1 shadow-green-500 relative'>
                    <span className='absolute right-[-5px] top-[-10px] scale-[2] select-none'>⭐</span>
                    <span className='absolute left-[-10px] top-[-10px] scale-[1.5] select-none'>🎗️</span>
                    <h1 className='underline underline-offset-2 decoration-green-200 text-lg font-semibold mb-1'>Penjelasan Singkat Tentang Web ini!</h1>
                    <p>Web ini berfungsi untuk mengubah raw code menjadi kode pnach. raw code bisa didapatkan dari hasil decrypt codebreaker atau bisa juga dari cheat engine. sebagai contoh seperti ini:</p>
                    <span className='font-semibold mt-2 mb-2 inline-block' style={{ fontStyle: "oblique" }}>20123456 FFFFFFFF</span>
                    <p>dengan web ini akan berubah menjadi :</p>
                    <span className='font-semibold inline-block mb-5' style={{ fontStyle: "oblique" }}>patch=1,EE,20123456,extended,FFFFFFFF</span>
                    <p>jika menggunakan syntax :</p>
                    <div className='flex gap-2'>
                        <span className='font-semibold tracking-wider'>2xxxxxxx xxxxxxxx :</span>
                        <span>gunakan rute sebelah kiri dibawah ini</span>
                    </div>
                    <div className='flex gap-2'>
                        <span className='font-semibold tracking-wider'>7FFxxxxxxxxx xxxxxxxx :</span>
                        <span>gunakan rute sebelah kanan dibawah ini</span>
                    </div>
                </div>
                <div className='grid justify-center mt-10'>
                    <span className='inline-block w-full text-center mb-2 border-b-2 text-xl'>RUTE :</span>
                    <div className='flex gap-5 justify-between'>
                        <Link className="bg-emerald-950 text-emerald-400 border border-emerald-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group" to={'/pcsx2-stable'}>
                            <span className="bg-emerald-400 shadow-emerald-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]" />
                            Cheat engine for pcsx2 v1.6
                        </Link>
                        <Link className="bg-emerald-950 text-emerald-400 border border-emerald-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group" to={'/pcsx2-nightly'}>
                            <span className="bg-emerald-400 shadow-emerald-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]" />
                            Cheat engine for pcsx2 v1.7
                        </Link>
                    </div>
                </div>
            </section >
        </>
    )
}
