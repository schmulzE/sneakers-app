import React, { ReactElement } from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from "../styles/Layout.module.css";
function Layout({children }: {children: ReactElement}) {

  return(
    <div className={styles.layout}>
    <Navbar/>
      <main>
        {children}
      </main>
    <Footer/>
    </div>
  )
}
export default Layout