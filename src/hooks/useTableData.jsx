import { useEffect, useState } from 'react'

const useTableData = ({ initialData, showHeader = null }) => {
  const [header, setHeader] = useState([])
  const [pageData, setPageData] = useState([])
  const [pagesNumber, setPagesNumber] = useState(1)
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(15)
  const getHeader = (data) => {
    for (const [i, item] of data.entries()) {
      if (i === 0) return Object.keys(item)
    }
  }

  useEffect(() => {
    getPagesNumber(initialData, rowsPerPage)
    sliceData(initialData, page, rowsPerPage)
    if (showHeader) return setHeader(showHeader)
    let headerResult = getHeader(initialData)
    setHeader(headerResult)
  }, [])

  useEffect(() => {
    if (page !== 1) {
      setPage(1)
    } else {
      getPagesNumber(initialData, rowsPerPage)
      sliceData(initialData, page, rowsPerPage)
      setPage(1)
    }
    if (showHeader) return setHeader(showHeader)
    let headerResult = getHeader(initialData)
    setHeader(headerResult)
  }, [initialData])

  useEffect(() => {
    if (page !== 1) {
      setPage(1)
    } else {
      getPagesNumber(initialData, rowsPerPage)
      sliceData(initialData, page, rowsPerPage)
      setPage(1)
    }
  }, [rowsPerPage])

  useEffect(() => {
    getPagesNumber(initialData, rowsPerPage)
    sliceData(initialData, page, rowsPerPage)
  }, [page])

  const getPagesNumber = (data = [], rowsPerPage) => {
    const pages = Math.ceil(data.length / rowsPerPage)
    setPagesNumber(pages)
  }

  const sliceData = (data = [], page, rowsPerPage) => {
    const slicedData = data.slice((page - 1) * rowsPerPage, page * rowsPerPage)
    setPageData(slicedData)
  }

  return [
    header,
    pageData,
    pagesNumber,
    page,
    rowsPerPage,
    setRowsPerPage,
    setPage,
  ]
}

export default useTableData
