import Logo from "components/Logo"

const AuthContainer = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-10 mx-auto bg-white rounded">
        {/* logo  */}
        <div className="flex items-center mb-6 space-x-2 text-primary">
          {/* color of the logo is picked from its parents text-color */}
          <Logo width={40} height={40} />
          <h4 className="text-xl font-bold">ProgHours</h4>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default AuthContainer