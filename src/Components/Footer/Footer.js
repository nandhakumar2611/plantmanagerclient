import React from 'react'

const Footer = () => {
    return (
        <div>
            <footer className="bg-primary fixed-bottom text-center text-lg-start">
                {/* <!-- Copyright --> */}
                <div className="text-center p-3" style={{ "backgroundcolor": " rgba(0, 0, 0, 0.2)" }}>
                    © 2023 Copyright:
                    <a className="text-dark" href="https://mindplm.com/">mindplm.com</a>
                </div>
                {/* <!-- Copyright --> */}
            </footer>
        </div>
    )
}

export default React.memo(Footer)