import React from 'react'
import Image from "next/image";
import uploadIcon from "../img/upload-icon.svg";

const UploadBox = ({handleOnChange}) => {
  return (
    <div className="mt-1 flex justify-center items-center px-6 pt-5 pb-6 border-2 border-purplePrimary rounded-lg h-40">
      <div className="space-y-1 text-center">
        <Image src={uploadIcon} />
        <div className="flex text-sm text-gray-600">
          <label
            htmlFor="file-upload"
            className="relative cursor-pointer bg-white rounded-md font-medium text-purplePrimary hover:text-purplePrimary focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
          >
            <span>Upload Image</span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              onChange={(e)=>handleOnChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default UploadBox