import React from 'react';
import Layout from '../components/Layout';
// @ts-ignore
import rainbowDark from '../assets/rainbowDark.png';
import Link from "next/link";

export default function IndexPage() {
  return (
    <Layout title="Diluv">
      <>
        <section className="text-gray-700 body-font">
          <div className="container mx-auto flex px-5 py-12 items-center justify-center flex-col">
            <img src={rainbowDark} className="lg:w-2/6 md:w-3/6 w-5/6 mb-5 object-cover object-center rounded-full"/>
            <div className="text-center lg:w-2/3 w-full">
              <h1 className="font-hero sm:text-4xl text-3xl mb-2 font-medium text-gray-900">Diluv</h1>
              <p className="mb-4 leading-relaxed">This paragraph will be written by Darkhax and you should ping Darkhax if you see this because it
                means
                he hasn't written a paragraph about what Diluv is and why you should be using it</p>
              <div className="flex justify-center">
                <Link href={"/about"}>
                  <a className="mr-2 inline-flex text-white bg-diluv-500 py-2 px-6 focus:outline-none hover:bg-diluv-600 text-lg">Learn more</a>
                </Link>
                <Link href={"/about"}>
                  <a className="ml-2 inline-flex text-gray-700 bg-gray-200 py-2 px-6 focus:outline-none hover:bg-gray-300 text-lg">View games</a>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="text-gray-700 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col">
              <div className="h-1 bg-gray-200 rounded overflow-hidden">
                <div className="w-32 h-full bg-diluv-500"/>
              </div>
              <div className="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
                <h1 className="sm:w-2/5 text-gray-900 font-medium title-font text-2xl mb-2 sm:mb-0">Popular games</h1>
              </div>
            </div>
            <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 justify-center">
              <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
                <div className="h-64 overflow-hidden">
                  <img alt="content" className="object-cover object-center h-full w-full" src="https://images.placeholders.dev/?text=minecraft"/>
                </div>
                <h2 className="text-xl font-medium title-font text-gray-900 mt-5">Minecraft</h2>
                <p className="text-base leading-relaxed mt-2">Minecraft is a block game that Darkhax can write more about</p>
                <a className="text-indigo-500 inline-flex items-center mt-3">View Projects</a>
              </div>
            {/*  add more cards here */}
            </div>
          </div>
        </section>
      </>
    </Layout>
  );
}

