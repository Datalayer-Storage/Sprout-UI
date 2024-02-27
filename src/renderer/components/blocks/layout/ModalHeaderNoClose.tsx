import React from "react";

const ModalHeaderNoClose: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = ({...props}) => {
  return (
    <div className={'flex items-start justify-between rounded-t dark:border-gray-600 border-b p-5'} {...props}/>
  );
}

export {ModalHeaderNoClose}