import React, { useState, useEffect } from 'react';
import { getCourses, getCoursesByCategory } from '../../service/courses.js';
import { getCategory } from '../../service/category.js';
import CourseList from '../../components/course/CoursesList.jsx';

export default function CoursesPage() {
  const [coursesData, setCoursesData] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const fetchedCourses = await getCourses();
        setCoursesData(fetchedCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <>
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <SearchCourse
            setSearchText={setSearchText}
            setCoursesData={setCoursesData}
          />
          {coursesData === undefined ? (
            <div className="flex justify-center items-center p-10">
              <h3 className="text-2xl font-medium text-gray-700">
                Data not found!
              </h3>
            </div>
          ) : (
            <CourseList
              coursesData={coursesData}
              searchText={searchText}
              coursesPerPage={9}
              scrollToTop={true}
            />
          )}
        </div>
      </main>
    </>
  );
}

function SearchCourse({ setSearchText, setCoursesData }) {
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const fetchedCategory = await getCategory();
        setCategoryData(fetchedCategory);
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    };
    fetchCategory();
  }, []);

  function handleSearch(event) {
    setSearchText(event.target.value);
  }

  const dataSearching = [];
  if (categoryData) {
    dataSearching.push(
      ...categoryData.map((category) => {
        return category;
      })
    );
  } else if (categoryData[0] && categoryData[0].content) {
    dataSearching.push(
      ...categoryData[0].content.map((category) => {
        return category;
      })
    );
  }
  console.log(dataSearching);
  const handleFilter = async (e, id) => {
    e.preventDefault();
    setSelectedCategory(id);
    const dataCategory = await getCoursesByCategory(id);
    setCoursesData(dataCategory);
  };

  const handleAllCategories = async () => {
    try {
      setSelectedCategory('All');
      const fetchedCategory = await getCategory();
      setCategoryData(fetchedCategory);
      const allCourses = await getCourses();
      setCoursesData(allCourses);
    } catch (error) {
      console.error('Error fetching all categories:', error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-6 mb-8">
      <input
        className="w-full max-w-2xl py-3 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
        type="text"
        placeholder="Search courses..."
        onChange={handleSearch}
      />
      <div className="w-full overflow-x-auto">
        <ul className="flex justify-start items-center gap-4 text-sm sm:text-base whitespace-nowrap pb-2">
          <button
            onClick={handleAllCategories}
            className={`px-3 py-1 rounded-full transition duration-150 ease-in-out ${
              selectedCategory === 'All'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          {dataSearching.map((data, index) => (
            <button
              onClick={(e) => handleFilter(e, data.id)}
              key={index}
              className={`px-3 py-1 rounded-full transition duration-150 ease-in-out ${
                selectedCategory === data.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {data.name}
            </button>
          ))}
        </ul>
      </div>
    </div>
  );
}
