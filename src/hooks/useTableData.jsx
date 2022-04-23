import { useEffect, useState } from 'react'

const useTableData = ({ initialData, showHeader = null }) => {

    const [header, setHeader] = useState([])

    const getHeader = (data) => {
        for (const [i, item] of data.entries()) {
            if (i === 0) return Object.keys(item)
        }
    }

    useEffect(() => {
        if (showHeader) return setHeader(showHeader)

        let headerResult = getHeader(initialData)
        setHeader(headerResult)
    }, [])

    useEffect(() => {
        if (showHeader) return setHeader(showHeader)

        let headerResult = getHeader(initialData)
        setHeader(headerResult)
    }, [initialData])

    return [header]
}

export default useTableData