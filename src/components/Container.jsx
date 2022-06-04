const Container = ({ children, title }) => {
  return (
    <div className="border rounded-lg shadow-sm bg-white p-2 my-2 max-w-2xl w-full">
      <h3 className="m-4">{title}</h3>
      {children}
    </div>
  )
}

export default Container
