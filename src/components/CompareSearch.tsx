import courses from "../data/courses.json"
import ThreeDots from "../icons/ThreeDots"
import Check from "../icons/Check"
import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'

/**
 * CompareSearch contains the code for a combobox with the courses we can select.
 */
const CompareSearch = ({selected, setCompare} : any) => {
  const [query, setQuery] = useState('')

  // We use filteredCourses as a variable to query the courses
  const filteredCourses =
    query === ''
      ? courses
      : courses.filter(({dept, number, title}) => {
          const course1 : String = `${dept}-${number}`
          const course2 : String = `${dept} ${number}`
          return (
            course2.toLowerCase().includes(query.toLowerCase()) ||
            course1.toLowerCase().includes(query.toLowerCase()) ||
            title.toLowerCase().includes(query.toLowerCase())
          )}
        )

  return (
    <div>
      <Combobox value={selected} onChange={(course) => setCompare(course.dept+"-"+course.number)}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default p-1 overflow-hidden rounded-lg text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            {/* Display an input field with HeadlessUI where the user can type to enter or dropdown select */}
            <Combobox.Input
              className="w-full border-none bg-[#f7fafc] py-2 pl-3 pr-10 text-sm leading-5  text-gray-900"
              displayValue={(course : any) => course}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ThreeDots></ThreeDots>
            </Combobox.Button>
          </div>
          {/* Options for the combobox */}
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {/* Filter the courses based on the query and display the courses that you found */}
              {filteredCourses.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredCourses.map((course: any) => (
                  <Combobox.Option
                    key={course.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={course}
                  >
                    <>
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                      {course.dept}-{course.number}
                    </span>
                    {selected === `${course.dept}-${course.number}` ? 
                      <span className={`absolute inset-y-0 left-0 flex items-center pl-3 text-teal-400`}>
                        <Check></Check>
                      </span>
                    : null}
                    </>
                  </Combobox.Option>
                )))}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}

export default CompareSearch