"use client";
import { useState } from "react";
import BannerFormTwo from "./BannerFormTwo";



const form_data: number[] = [1, 2, 3, 4, 5, 6];

const BannerFormThree = () => {

   const [activeTab] = useState(0);



   return (
      <>
         <div className="container">
            <div className="row">
               <div className="col-lg-12">
                  <div className="tg-booking-form-wrap">
                     <div className="tab-content" id="nav-tabContent">
                        {form_data.map((item, index) => (
                           <div key={item} className={`tab-pane fade ${activeTab === index ? 'show active' : ''}`} id="nav-platform">
                              <div className="tg-booking-form-item">
                                 <BannerFormTwo />
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default BannerFormThree
