import React from 'react'
import { HighlightText } from '../components/core/Homepage/HighlightText'
import BannerImage1 from '../assets/Images/aboutus1.webp'
import BannerImage2 from '../assets/Images/aboutus2.webp'
import BannerImage3 from '../assets/Images/aboutus3.webp'
import FoundingStory from '../assets/Images/FoundingStory.png'
import Stats from '../components/core/Aboutpage/Stats'
import LearningGrid from '../components/core/Aboutpage/LearningGrid'
import ContactFormSections from '../components/core/Aboutpage/ContactFormSections'

const About = () => {
  return (
    <div className=' ' >
      {/* section 1 */}
      <section>
        <div>
          <header className='text-white'>
            <p className='text-4xl'>Driving Inovation in Online Education for a</p>
            <HighlightText text={"Brighter Future"} />
            <p>studynotion is forfront for driving innovation in online education. We're passinate about creating a brighter future by offering cutting edge courses, leverging emerging technology and nutriting a vibrant learning community.</p>
          </header>
          <div
            className='flex gap-x-3 justify-center'>
            <img src={BannerImage1} />
            <img src={BannerImage2} />
            <img src={BannerImage3} />
          </div>
        </div>
      </section>


      {/* section 2 */}
      <section>
        <div className='text-white'>
          <p>We are passionate  about revolutionizing the way we learn. Our innovative platform</p>
          <HighlightText text={"Combines technology"} />
          <span className='text-pink-100'>
            {" "}
            expertise
          </span>
          , and community to create an

          <span className='text-pink-100'>
            {' '}
            unparalleled educational experience
          </span>
        </div>
      </section>


      {/* section 3 */}
      <section>
        <div className='flex flex-col text-white'>
          {/* founding story wala div he  */}
          <div className='flex'>
            <div>
              <h1>Our Founding Story</h1>
              <p>our e learning platform was born out of a shared vision and passion for transforming education.
                It all begen with group of educators, technologies, and lifelong learners who recognize the need of accessible, flexible, and high-quality learning opportunity in a rapidly involving digital world.
              </p>
              <p>our e learning platform was born out of a shared vision and passion for transforming education.
                It all begen with group of educators, technologies, and lifelong learners who recognize the need of accessible, flexible, and high-quality learning opportunity in a rapidly involving digital world.
              </p>
            </div>



            <div>
              <img src={FoundingStory} />
            </div>
          </div>



          {/* vision and mission wala div */}
          <div className='flex'>
            {/* left box */}
            <div>
              <h1>Our Vission</h1>
              <p>our e learning platform was born out of a shared vision and passion for transforming education.
                It all begen with group of educators, technologies, and lifelong learners who recognize the need of accessible, flexible, and high-quality learning opportunity in a rapidly involving digital world.
              </p>
            </div>

            {/* right box */}
            <div>
              <h1>Our Mission</h1>
              <p>our e learning platform was born out of a shared vision and passion for transforming education.
                It all begen with group of educators, technologies, and lifelong learners who recognize the need of accessible, flexible, and high-quality learning opportunity in a rapidly involving digital world.
              </p>
            </div>

          </div>

        </div>

      </section>



      {/* section 4 */}
      <section>
         <Stats/>
      </section>


      {/* section 5 */}
      <section>
          <LearningGrid/>
      </section>



      {/* section 6 */}
      <section>
          <ContactFormSections/>
      </section>


      {/* section 7 */}
      <section>
        <div className='text-white'>
          Reviews from other learners

        </div>
      </section>




    </div>
  )
}

export default About