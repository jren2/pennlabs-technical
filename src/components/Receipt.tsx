import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

const Receipt = ({courses} : any) => {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <div className="">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-[#55c193] px-4 py-2 duration-200 text-sm font-medium text-white hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Confirm
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-white p-6 px-10 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl text-center font-semibold leading-6 text-gray-900"
                  >
                    Course Cart Submitted!
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm pb-2 text-gray-500">
                      Your cart has been successfully submitted:
                    </p>
                  </div>

                  {
                    courses !== undefined && 
                      courses.map((course : any) => (
                        <>
                          <div className="py-2">
                            <div className="text-base font-medium tracking-wide">{course.id}</div>
                            <div className="font-light text-base truncate">{course.title}</div>
                          </div>
                        </>
                      ))
                  }
      

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Return to cart
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default Receipt