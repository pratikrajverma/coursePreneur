import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import {categories} from '../services/apis'
import {apiConnector} from '../services/apiconnector'
import {getCatalogPageData}  from '../services/operations/pageAndComponentData'
import CourseSlider from '../components/core/Catalog/CourseSlider'
import MostSellingCourseCard from '../components/core/Catalog/MostSellingCourseCard'
 

const Catalog = () => {

  const {catalogName} = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState('');
  
  const [newAndPopularCourse, setNewAndPopularCourse] = useState('popular');


  //fetch all catagories..........
  useEffect(()=>{
    
      const getCategories = async ()=>{
        const result = await apiConnector("GET", categories.CATEGORIES_API);
        const category_id = result?.data?.data?.filter((ct)=> ct.name.split(' ').join('')
                            .toLowerCase() === catalogName)[0]._id;

        setCategoryId(category_id);
      }
    

      getCategories();
  },[catalogName])


  useEffect(()=>{
    const getCategoryDetails = async ()=>{
      try{
        const result = await getCatalogPageData( categoryId);

        setCatalogPageData(result);

        // console.log('result',result);
      }catch(error){
        console.log(error)
      }


    }



    if(categoryId){
        getCategoryDetails();
      }

  },[categoryId])





 
 

  return (
    <div className='text-white'>

      {/*............. Hero section......... */}
      <div>
        <p>Home / Catalog / <span className='text-yellow-25'>{catalogPageData?.data?.selectedCategory?.name} </span></p> 
        <p> {catalogPageData?.data?.selectedCategory?.name}  </p>
        <p>{catalogPageData?.data?.selectedCategory?.description} </p>
      </div>?


      <div>
        {/* ................. sction 1 ............ */}
          <div>
            <div>Courses to get you started</div>

            <div className='flex gap-x-3 border-b w-3/4 mx-auto pb-3 relative'>
              <p className={ ` ${newAndPopularCourse === 'popular' ? 'text-yellow-25 border-b-2 border-yellow-200  ' : 'text-white  ' }  pb-2 top-3 relative  cursor-pointer` }
                  onClick={()=> setNewAndPopularCourse('popular')}>
                  Most Popular</p>

              <p className={`  ${newAndPopularCourse === 'new' ? 'text-yellow-25   border-b-2 border-yellow-200 ' : 'text-white  ' }   pb-2 top-3 relative cursor-pointer`   }
                   onClick={()=> setNewAndPopularCourse('new')}
                  >New</p>
            </div>

            {/* ..............showing course.......... */}
            <div className='   w-3/4 my-20 mx-auto '>
                <p className='text-2xl mb-5'>All course in {catalogPageData?.data?.selectedCategory?.name}</p>
                <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.course}/>
            </div>
          </div>

          <hr className='text-red-500'/>

        {/* ................. sction 2 ............ */}
        <div className=' w-3/4 my-16 '>
          <p  className='text-2xl mb-5'>Top Courses in {catalogPageData?.data?.selectedCategory?.name} </p>
          <div>
            <CourseSlider Courses={catalogPageData?.data?.differentCategory?.course} />
          </div>
        </div>




        {/* ................. sction 3 ............ */}
        <div>
            <p>Frequently Bought </p>
            <div>
                <div className='grid grid-cols-1 gap-y-14 lg:grid-cols-2   mt-20 w-11/12 mx-auto'>
                    {
                        catalogPageData?.data?.mostSellingCourses?.slice(0,4).map((course, index)=>(
                          <MostSellingCourseCard key={index} course={course}/>
                        ))

                    }

                </div>
            </div>

        </div>

      </div>

      <Footer/>
    </div>
  )
}

export default Catalog