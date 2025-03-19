import * as React from "react"

import Footer from "./footer";
import Header from "./header";

export default function Layout({children}) {
    return (
        <div className={'min-h-screen flex flex-col'}>
            <Header/>
            <main className={'grow'}>
                {children}
            </main>
            <Footer/>
        </div>
    )
}