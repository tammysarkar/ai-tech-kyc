import React from 'react'


interface CardInterface {
  width?: string;
  height?: string;
  display?: string;
  content?: React.ReactNode;
  children?: React.ReactNode;

}
export const Card : React.FC<CardInterface> = ({ width, height, display, content, children}) => {
  return (
    <div className=' card-row  max-w-8xl mx-auto px-6 py-8  bg-white border border-slate-200 rounded-lg shadow-sm justify-end' style={{width: width, height: height, display: display}}>
      {content}
      {children}
    </div>
  )
}
