import React from "react";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { db } from "../firebase.config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useRouter } from "next/router";


import Image from "next/image";
import MaleIcon from "../img/male.svg";
import FemaleIcon from "../img/female.svg";
import CloseBtn from "../img/close-btn.svg";

const CreatePartner = ({ openPartnerModal, closePartnerModal }) => {
  const router = useRouter();

  const [place, setPlace] = useState()
  const [date, setDate] = useState();
  const [hotelName, setHotelName] = useState();
  const [amount, setAmount] = useState();
  const [gender, setGender] = useState();
  const [message, setMessage] = useState();
  const [images, setImages] = useState();
  const [userType, setUserType] = useState();
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "posts"), {
        place,
        date,
        message,
        amount,
        gender,
        userType: "partner",
        created: Timestamp.now(),
      });
      setSubmitted(true);
       router.push("/posts");

    } catch (err) {
      alert(err);
    }
    finally { setLoading (false)}
  };

  return (
    <Transition.Root show={openPartnerModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closePartnerModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto w-full">
          <div className="flex items-end sm:items-center justify-center min-h-full  p-4 sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-[#FCFCFF] rounded-2xl md:py-8 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 w-full max-w-[600px]">
                <div>
                  <div className="mt-1">
                    <div className="flex justify-between border-b md:px-8 px-5 pb-4">
                      <Dialog.Title
                        as="h3"
                        className="text-2xl leading-6 font-medium text-gray-900"
                      >
                        Add Travel Details
                      </Dialog.Title>
                      <div>
                        <button
                          className="border rounded-full p-1 flex justify-center items-center border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          onClick={closePartnerModal}
                        >
                          <Image src={CloseBtn} className="" alt="" srcSet="" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 md:px-8 px-5">
                      {submitted ? (
                        <div>
                          <p>Post succesfull</p>
                        </div>
                      ) : (
                        <form onSubmit={handleSubmit}>
                          {/* form-fields  */}
                          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4">
                            <div className="">
                              <label
                                htmlFor="first-name"
                                className="block text-rhythm"
                              >
                                Where you are going
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  value={place}
                                  onChange={(e) => setPlace(e.target.value)}
                                  name=""
                                  id=""
                                  autoComplete="place"
                                  className="bg-white border border-[#E9E9EE] text-black font-medium text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                  placeholder="Goa"
                                />
                              </div>
                            </div>

                            <div className="">
                              <label
                                htmlFor="first-name"
                                className="block text-rhythm"
                              >
                                When you going
                              </label>
                              <div className="mt-1">
                                <input
                                  type="date"
                                  name=""
                                  id=""
                                  value={date}
                                  onChange={(e) => setDate(e.target.value)}
                                  autoComplete="place"
                                  className="bg-white border border-[#E9E9EE] text-black font-medium text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                  placeholder="Goa"
                                />
                              </div>
                            </div>

                            <div className="">
                              <label
                                htmlFor="first-name"
                                className="block text-rhythm"
                              >
                                How much you pay for one night stay
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  name=""
                                  id=""
                                  value={amount}
                                  onChange={(e) => setAmount(e.target.value)}
                                  autoComplete="place"
                                  className="bg-white border border-[#E9E9EE] text-black font-medium text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                  placeholder="$300"
                                />
                              </div>
                              <p className="text-rhythm text-sm">
                                Your Partner Pay{" "}
                                <span className="text-purplePrimary">$250</span>{" "}
                                to you
                              </p>
                            </div>

                            <div className="">
                              <label
                                htmlFor="first-name"
                                className="block text-rhythm"
                              >
                                Message for your partner
                              </label>
                              <div className="mt-1">
                                <textarea
                                  type="text"
                                  name=""
                                  id=""
                                  value={message}
                                  onChange={(e) => setMessage(e.target.value)}
                                  autoComplete="place"
                                  className="bg-white border border-[#E9E9EE] text-black font-medium text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                  placeholder="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint."
                                ></textarea>
                              </div>
                            </div>

                            <div className="">
                              <label
                                htmlFor="first-name"
                                className="block text-rhythm"
                              >
                                Type of travel partner looking for
                              </label>
                              <div className="mt-1">
                                <ul
                                  className="grid grid-cols-3 gap-6 mt-2"
                                  onChange={(e) => setGender(e.target.value)}
                                >
                                  <li className="relative">
                                    <input
                                      className="sr-only peer"
                                      type="radio"
                                      value="male"
                                      name="gender"
                                      id="male"
                                    />
                                    <label
                                      className="flex py-6 bg-white border border-gray-300 justify-center rounded-xl cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:purplePrimary peer-checked:ring-2 peer-checked:border-transparent"
                                      htmlFor="male"
                                    >
                                      <Image src={MaleIcon} className="mr-3" alt=""/>
                                      <span className="ml-3">Male</span>
                                    </label>
                                  </li>

                                  <li className="relative">
                                    <input
                                      className="sr-only peer"
                                      type="radio"
                                      value="female"
                                      name="gender"
                                      id="female"
                                    />
                                    <label
                                      className="flex py-6 bg-white border border-gray-300 justify-center rounded-xl cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:purplePrimary peer-checked:ring-2 peer-checked:border-transparent"
                                      htmlFor="female"
                                    >
                                      <Image
                                        src={FemaleIcon}
                                        className="mr-3"
                                        alt=""
                                      />
                                      <span className="ml-3">Female</span>
                                    </label>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          <div className="mt-10 border-t pb-3 pt-5">
                            <button
                              type="submit"
                              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-4 bg-purplePrimary text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                            >
                              {loading ? (
                                <div
                                  className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600"
                                  role="status"
                                >
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
                                </div>
                              ) : (
                                "Post it"
                              )}
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CreatePartner;
