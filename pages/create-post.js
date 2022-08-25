import React from "react";
import { db } from "./firebase.config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import {
  ref,
  uploadString,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import { useRouter } from "next/router";

import uploadIcon from "../img/upload-icon.svg";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
// import UploadBox from "../components/UploadBox";
import MaleIcon from "../img/male.svg";
import FemaleIcon from "../img/female.svg";

import CloseBtn from "../img/close-btn.svg";

const CreatePost = ({ openModal, closeModal }) => {
  const router = useRouter();
  
  const [place, setPlace] = useState();
  const [date, setDate] = useState();
  const [hotelName, setHotelName] = useState();
  const [amount, setAmount] = useState();
  const [gender, setGender] = useState();
  const [message, setMessage] = useState();
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // upload();
      if (image) {
        setLoading(true);
        const storage = getStorage();
        const storageRef = ref(storage, `images/${image.name}`);

        //Convert to base64
        const converted = await convertBase64(image);

        //upload image then add it to the request object
        uploadString(storageRef, converted, "data_url").then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((URL) => {
              addDoc(collection(db, "posts"), {
                place,
                date,
                message,
                amount,
                gender,
                hotelName,
                userType: "hotel-booking",
                imageUrl: URL,
                created: Timestamp.now(),
              });
            })
            .then(() => {
              setLoading(false);
              setSubmitted(true);
             router.push("/posts");

            });
        });

      }

    } catch (err) {
      alert(err);
    }
  };

  return (
    <Transition.Root show={openModal} as={Fragment}>
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
          <div className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-full overflow-y-auto">
          <div className="flex items-end justify-center min-h-full p-4 sm:items-center sm:p-0">
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
                    <div className="flex justify-between px-5 pb-4 border-b md:px-8">
                      <Dialog.Title
                        as="h3"
                        className="text-2xl font-medium leading-6 text-gray-900"
                      >
                        Add Travel Details
                      </Dialog.Title>
                      <div>
                        <button
                          className="flex items-center justify-center p-1 border border-gray-300 rounded-full focus:ring-blue-500 focus:border-blue-500"
                          onClick={closeModal}
                        >
                          <Image src={CloseBtn} className="" alt="" srcSet="" />
                        </button>
                      </div>
                    </div>

                    <div className="px-5 mt-6 md:px-8">
                      <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 md:grid-cols-3">
                          <div className="flex items-center justify-center px-6 pt-5 pb-6 mt-1 border-2 rounded-lg border-purplePrimary">
                            <div className="space-y-1 text-center">
                              <div className="">
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  className="sr-only"
                                  onChange={(e) => {
                                    setImage(e.target.files[0]);
                                  }}
                                />

                                <label
                                  htmlFor="file-upload"
                                  className="relative py-10 font-medium bg-white rounded-md cursor-pointer text-purplePrimary hover:text-purplePrimary focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                >
                                  <Image
                                    src={uploadIcon}
                                    className="d-block cursor"
                                    alt=""
                                  />

                                  <span className="block">Upload Image</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* form-fields  */}
                        <div className="grid grid-cols-1 mt-6 gap-y-6 gap-x-4">
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
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
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
                              Enter Hotel Name
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name=""
                                value={hotelName}
                                onChange={(e) => setHotelName(e.target.value)}
                                id=""
                                autoComplete="place"
                                className="bg-white border border-[#E9E9EE] text-black font-medium text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="Goa"
                              />
                            </div>
                          </div>

                          {/* <div className="">
                            <label
                              htmlFor="first-name"
                              className="block text-rhythm"
                            >
                              Rating
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name=""
                                id=""
                                autoComplete="place"
                                className="bg-white border border-[#E9E9EE] text-black font-medium text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="Goa"
                              />
                            </div>
                          </div> */}

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
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                id=""
                                autoComplete="place"
                                className="bg-white border border-[#E9E9EE] text-black font-medium text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="$300"
                              />
                            </div>
                            <p className="text-sm text-rhythm">
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
                                    className="flex justify-center py-6 bg-white border border-gray-300 cursor-pointer rounded-xl focus:outline-none hover:bg-gray-50 peer-checked:purplePrimary peer-checked:ring-2 peer-checked:border-transparent"
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
                                    className="flex justify-center py-6 bg-white border border-gray-300 cursor-pointer rounded-xl focus:outline-none hover:bg-gray-50 peer-checked:purplePrimary peer-checked:ring-2 peer-checked:border-transparent"
                                    htmlFor="female"
                                  >
                                    <Image src={FemaleIcon} className="mr-3" alt="" />
                                    <span className="ml-3">Female</span>
                                  </label>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="pt-5 pb-3 mt-10 border-t">
                          <button
                            type="submit"
                            className="inline-flex justify-center w-full px-4 py-4 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-purplePrimary hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                          >
                            {loading ? (
                              <div
                                className="inline-block w-8 h-8 text-blue-600 border-4 rounded-full spinner-border animate-spin"
                                role="status"
                              >
                                <span className="visually-hidden">Loading...</span>
                              </div>
                            ) : (
                              "Post it"
                            )}
                          </button>
                        </div>
                      </form>
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

export default CreatePost;
