import React, { useState } from 'react'
import { round } from '../helpers/round'
import { RiArrowDownLine, RiArrowUpLine } from "react-icons/ri";

const Card = ({ data }) => {

    const { label, period, total, previousTotal, previousPeriod } = data
    const difference = total - previousTotal

    return (
        <div className='shadow-lg bg-white rounded-lg border w-full my-2 md:my-0'>
            <div className='m-4 uppercase font-mono'>
                <div className='flex gap-2 justify-between'>
                    <div className='flex flex-col'>
                        <p className=' font-semibold text-gray-500 text-sm'>{label}</p>
                        <div className='flex flex-row'>
                            {difference > 0 ?
                                <RiArrowUpLine className='mt-1 text-green-600' />
                                :
                                <RiArrowDownLine className='mt-1 text-red-600' />
                            }
                            <p className='text-xl font-bold'>${total}</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className={`self-center`}>${round(previousTotal, 2)}</p>
                        <p className='text-xs text-gray-500'>{previousPeriod}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card