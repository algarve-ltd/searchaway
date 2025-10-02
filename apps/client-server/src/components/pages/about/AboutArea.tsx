import Image from "next/image";

const AboutArea = () => {
   return (
      <div className="tg-about-area py-100">
         <div className="container">
            {/* Hero Section */}
            <div className="tg-chose-area tg-grey-bg pt-80 pb-80 mb-80 p-relative z-index-1">
               <div className="container">
                  <div className="row justify-content-center">
                     <div className="col-xl-8 col-lg-9 col-md-10">
                        <div className="tg-chose-section-title text-center">
                           <h5 className="tg-section-subtitle mb-15 wow fadeInUp" data-wow-delay=".3s" data-wow-duration=".5s">Welcome to SearchAway</h5>
                           <h1 className="mb-25 wow fadeInUp" data-wow-delay=".4s" data-wow-duration=".7s">About Us – SearchAway</h1>
                           <p className="lead wow fadeInUp mb-0" data-wow-delay=".5s" data-wow-duration=".9s">
                              We believe your holiday should be more than just a booking — it should be an experience crafted with care.
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Content sections with boxed background */}
            <div className="tg-grey-bg rounded-15 p-60 mb-80">
               {/* Our Mission Section */}
               <div className="row mb-80" style={{paddingTop: '50px'}}>
                  <div className="col-lg-8 mx-auto text-center">
                     <h2 className="mb-25 wow fadeInUp" data-wow-delay=".3s">Our Mission</h2>
                     <p className="mb-30 wow fadeInUp" data-wow-delay=".4s">
                        Our mission is simple: to connect travellers with holidays created by trusted, independent UK travel experts. 
                        We want to cut through the noise of online search engines and give you access to offers that are genuine, 
                        reliable, and designed with care.
                     </p>
                     <div className="row">
                        <div className="col-lg-10 mx-auto">
                           <div className="bg-light rounded-15 p-30 wow fadeInUp" data-wow-delay=".5s">
                              <h5 className="mb-20">With SearchAway, you&apos;ll always know that the holidays listed have been:</h5>
                              <div className="row">
                                 <div className="col-md-4 mb-15">
                                    <p className="mb-0">✔ Sourced by a UK-based travel professional</p>
                                 </div>
                                 <div className="col-md-4 mb-15">
                                    <p className="mb-0">✔ Properly researched and fairly priced</p>
                                 </div>
                                 <div className="col-md-4 mb-15">
                                    <p className="mb-0">✔ Backed by industry knowledge and personal service</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Who We Are Section */}
               <div className="row align-items-center mb-80">
                  <div className="col-lg-6 mb-30">
                     <div className="tg-about-content">
                        <h2 className="mb-25 wow fadeInUp" data-wow-delay=".3s">Who We Are</h2>
                        <p className="mb-20 wow fadeInUp" data-wow-delay=".4s">
                           At SearchAway, we partner exclusively with independent UK travel advisors who use their expertise, 
                           industry contacts, and personal insight to source holidays that genuinely stand out.
                        </p>
                        <p className="mb-0 wow fadeInUp" data-wow-delay=".5s">
                           Every trip you&apos;ll find on SearchAway started life as a real quote for a real traveller. We bring 
                           these offers together in one easy-to-use platform so you can browse, compare, and book holidays 
                           with confidence.
                        </p>
                     </div>
                  </div>
                  <div className="col-lg-6 mb-30">
                     <div className="tg-about-thumb-wrap">
                        <Image 
                           className="w-100 rounded-15" 
                           src="/assets/img/about/travel-advisors-at-work.jpg" 
                           alt="Travel Advisors at Work"
                           width={500}
                           height={300}
                           style={{objectFit: 'cover'}}
                        />
                     </div>
                  </div>
               </div>

               {/* Why We're Different Section */}
               <div className="row align-items-center mb-80">
                  <div className="col-lg-6 mb-30 order-lg-2">
                     <div className="tg-about-content">
                        <h2 className="mb-25 wow fadeInUp" data-wow-delay=".3s">Why We&apos;re Different</h2>
                        <p className="mb-25 wow fadeInUp" data-wow-delay=".4s">
                           Unlike many holiday search sites that rely on automated feeds or generic mass-market deals, 
                           SearchAway is powered by people.
                        </p>
                        <div className="wow fadeInUp" data-wow-delay=".5s">
                           <div className="mb-20">
                              <h5 className="mb-10">Independent expertise</h5>
                              <p className="mb-0">Our travel advisors are not tied to one tour operator, so they can search across multiple suppliers to find the right fit.</p>
                           </div>
                           <div className="mb-20">
                              <h5 className="mb-10">Real quotes, not random offers</h5>
                              <p className="mb-0">Each holiday is created with real pricing, availability, and package details — not scraped from the internet.</p>
                           </div>
                           <div className="mb-0">
                              <h5 className="mb-10">Personal touch</h5>
                              <p className="mb-0">Every advisor is UK-based, available to answer questions, and committed to ensuring you get the holiday you want.</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="col-lg-6 mb-30 order-lg-1">
                     <div className="tg-about-thumb-wrap">
                        <Image 
                           className="w-100 rounded-15" 
                           src="/assets/img/about/personal-service.jpg" 
                           alt="Personal Service Illustration"
                           width={500}
                           height={350}
                           style={{objectFit: 'cover'}}
                        />
                     </div>
                  </div>
               </div>

               {/* Supporting Independent Advisors Section */}
               <div className="row align-items-center" style={{paddingBottom: '40px'}}>
                  <div className="col-lg-6 mb-30">
                     <div className="tg-about-content">
                        <h2 className="mb-25 wow fadeInUp" data-wow-delay=".3s">Supporting Independent Advisors</h2>
                        <p className="mb-20 wow fadeInUp" data-wow-delay=".4s">
                           When you book through SearchAway, you&apos;re not only securing a fantastic holiday — you&apos;re also 
                           supporting small, independent UK travel businesses.
                        </p>
                        <p className="mb-20 wow fadeInUp" data-wow-delay=".5s">
                           Our advisors are part of the backbone of the travel industry, bringing decades of combined 
                           experience and a personal passion for helping people travel better.
                        </p>
                        <p className="mb-0 wow fadeInUp" data-wow-delay=".6s">
                           By choosing SearchAway, you&apos;re choosing to keep your booking in safe hands while helping 
                           independent businesses thrive.
                        </p>
                     </div>
                  </div>
                  <div className="col-lg-6 mb-30">
                     <div className="tg-about-thumb-wrap">
                        <Image 
                           className="w-100 rounded-15" 
                           src="/assets/img/about/independent-advisors.jpg" 
                           alt="Independent Travel Advisors"
                           width={500}
                           height={300}
                           style={{objectFit: 'cover'}}
                        />
                     </div>
                  </div>
               </div>
            </div>

         </div>
         
         {/* Book With Confidence Section */}
         <div className="tg-banner-area tg-grey-bg mt-80 p-relative" style={{ 
            backgroundImage: `url(/assets/img/banner/banner-4/banner-4.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            paddingTop: '100px'
         }}>
            {/* Dark overlay for better text readability */}
            <div className="p-absolute w-100 h-100" style={{
               backgroundColor: 'rgba(0, 0, 0, 0.4)',
               top: 0,
               left: 0,
               zIndex: 1
            }}></div>
            <div className="container p-relative" style={{ zIndex: 2 }}>
               <div className="col-lg-12">
                  <div className="tg-banner-2-content tg-banner-4-content tg-banner-6-content text-center">
                     <div className="tg-about-section-title mb-25">
                        <h5 className="tg-section-subtitle mb-20 wow fadeInUp" data-wow-delay=".4s" data-wow-duration=".9s">Trusted & Secure</h5>
                        <h2 className="tg-section-title-white mb-30 wow fadeInUp" data-wow-delay=".5s" data-wow-duration=".9s">Book With Confidence</h2>
                        <p className="text-white mb-20 wow fadeInUp" data-wow-delay=".6s" data-wow-duration=".9s">
                           Every advisor working with SearchAway is a trusted professional with access to ABTA and ATOL-protected 
                           holidays through their partner agencies. That means your money and your travel plans are always secure.
                        </p>
                        <p className="text-white lead mb-0 wow fadeInUp" data-wow-delay=".7s" data-wow-duration=".9s">
                           With SearchAway, you&apos;re not left on your own — you&apos;ve got the backing of a real expert, 
                           from first search to final booking.
                        </p>
                     </div>
                  </div>
               </div>
            </div>
            <div className="tg-banner-bottom pb-100 p-relative" style={{ zIndex: 2 }}>
               <div className="container-fluid">
                  <div className="row">
                     <div className="col-lg-12">
                        <div className="tg-banner-2-big-title text-center wow fadeInUp" data-wow-delay=".8s" data-wow-duration=".9s">
                           <h2>SearchAway</h2>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default AboutArea