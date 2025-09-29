"use client"
import Image from "next/image"
import Link from "next/link"

import logo from "@/assets/img/logo/logo-white.png"

const FooterThree = () => {

   return (
      <>
         <footer>
            <div className="tg-footer-area tg-footer-space include-bg" style={{ backgroundImage: `url(/assets/img/footer/footer.jpg)` }}>
               <div className="container">
                  <div className="tg-footer-top mb-40">
                     <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                           <div className="tg-footer-widget mb-40">
                              <div className="tg-footer-logo mb-20">
                                 <Link href="/"><Image src={logo} alt="" /></Link>
                              </div>
                              <p className="mb-20">SearchAway only features real holidays, created by independent UK travel advisors, not automated deals. Every offer is researched, priced, and ready for you.</p>
                              <div className="tg-footer-social">
                                 <Link href="#"><i className="fa-brands fa-facebook-f"></i></Link>
                                 <Link href="#"><i className="fa-brands fa-instagram"></i></Link>
                                 <Link href="#"><i className="fa-brands fa-tiktok"></i></Link>
                              </div>
                           </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                           <div className="tg-footer-widget tg-footer-link ml-80 mb-40">
                              <h3 className="tg-footer-widget-title mb-25">Quick Links</h3>
                              <ul>
                                 <li><Link href="/">Home</Link></li>
                                 <li><Link href="/about">About Us</Link></li>
                                 <li><Link href="https://quoteawayai.com/searchaway">Agent Sign Up</Link></li>
                                 <li><Link href="/terms-and-conditions">Terms and Conditions</Link></li>
                              </ul>
                           </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 offset-xl-1 offset-lg-1">
                           <div className="tg-footer-widget tg-footer-info mb-40">
                              <h3 className="tg-footer-widget-title mb-25">Information</h3>
                              <ul>
                                 <li>
                                    <Link className="d-flex" href="https://www.google.com/maps/@41.6758525,-86.2531698,18.17z">
                                       <span className="mr-15">
                                          <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                             <path d="M19.0013 10.0608C19.0013 16.8486 10.3346 22.6668 10.3346 22.6668C10.3346 22.6668 1.66797 16.8486 1.66797 10.0608C1.66797 7.74615 2.58106 5.52634 4.20638 3.88965C5.83169 2.25297 8.03609 1.3335 10.3346 1.3335C12.6332 1.3335 14.8376 2.25297 16.4629 3.88965C18.0882 5.52634 19.0013 7.74615 19.0013 10.0608Z" stroke="white" strokeWidth="1.73333" strokeLinecap="round" strokeLinejoin="round" />
                                             <path d="M10.3346 12.9699C11.9301 12.9699 13.2235 11.6674 13.2235 10.0608C13.2235 8.45412 11.9301 7.15168 10.3346 7.15168C8.73915 7.15168 7.44575 8.45412 7.44575 10.0608C7.44575 11.6674 8.73915 12.9699 10.3346 12.9699Z" stroke="white" strokeWidth="1.73333" strokeLinecap="round" strokeLinejoin="round" />
                                          </svg>
                                       </span>
                                       71-75 Shelton Street, <br />London, <br />Greater London, <br />United Kingdom, <br />WC2H 9JQ
                                    </Link>
                                 </li>
                                 <li>
                                    <Link className="d-flex" href="mailto:info@quoteawayai.com">
                                       <span className="mr-15">
                                          <i className="fa-sharp text-white fa-solid fa-envelope"></i>
                                       </span>
                                       info@quoteawayai.com
                                    </Link>
                                 </li>
                              </ul>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="tg-footer-copyright text-center">
                  <span>
                     © 2025 SearchAway. All rights reserved. SearchAway is a trading name of ALGARVE LTD. Company Number: 12839717
                  </span>
               </div>
            </div>
         </footer>
      </>
   )
}

export default FooterThree
