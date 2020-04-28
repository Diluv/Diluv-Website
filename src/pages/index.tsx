import React from 'react';
import Layout from '../components/Layout';
// @ts-ignore
import rainbowDark from '../assets/rainbowDark.png';
import Link from "next/link";

export default function IndexPage() {
  return (
    <Layout title="Diluv">
      <>
        <section className="text-gray-700 bg-gray-100">
          <div className="container mx-auto flex px-5 py-12 items-center justify-center flex-col">
            <div className="text-center lg:w-2/3 w-full">
              <h1 className="font-hero sm:text-6xl text-5xl mb-2 font-medium text-gray-900">Diluv</h1>
              <p className="mb-4 leading-relaxed sm:text-lg text-gray-700">This paragraph will be written by Darkhax and you should ping Darkhax if
                you see this because it
                means
                he hasn't written a paragraph about what Diluv is and why you should be using it</p>
              <div className="flex justify-center">
                <Link href={"/about"}>
                  <a className="mr-2 inline-flex text-white bg-diluv-500 py-4 px-12 focus:outline-none hover:bg-diluv-600 text-lg">Learn more</a>
                </Link>
                <Link href={"/about"}>
                  <a className="ml-2 inline-flex text-gray-700 bg-gray-200 py-4 px-12 focus:outline-none hover:bg-gray-300 text-lg">View games</a>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="text-gray-700 bg-gray-200">
          <div className="container px-5 py-10 mx-auto">
            <div className="flex flex-wrap w-full mb-20">
              <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                <h1 className="sm:text-3xl text-2xl font-medium mb-2 text-gray-900">Popular Games</h1>
                <div className="h-1 w-24 bg-diluv-500"/>
              </div>
              <p className="lg:w-1/2 w-full leading-relaxed text-base">These are some of the games that our users seem to really enjoy! This should be
                a bit of a paragraph something to the effect of this length to use up the whitespace on this side, should make the page feel more
                even</p>
            </div>
            <div className="flex flex-wrap -m-4">
              <div className="xl:w-1/3 mx-auto md:w-1/2 p-4">
                <div className="bg-gray-300 p-6 rounded-lg">
                  <img className="h-40 rounded w-full object-cover object-center mb-6" src="https://imja.red/diluv/minecraft-java.webp" alt="content"/>
                  <h3 className="text-diluv-700 text-xs font-medium">MODS | MODPACKS | RESOURCE PACKS</h3>
                  <h2 className="text-xl text-gray-900 font-medium mb-4">Minecraft</h2>
                  <p className="leading-relaxed text-base">Minecraft is a game that Darkhax can describe</p>
                </div>
              </div>
              <div className="xl:w-1/3 mx-auto md:w-1/2 p-4">
                <div className="bg-gray-300 p-6 rounded-lg">
                  <img className="h-40 rounded w-full object-cover object-center mb-6" src="https://dummyimage.com/721x401" alt="content"/>
                  <h3 className="tracking-widest text-diluv-700 text-xs font-medium">MODS</h3>
                  <h2 className="text-xl text-gray-900 font-medium mb-4">Stardew Valley</h2>
                  <p className="leading-relaxed text-base">Stardew valley is a game that Darkhax can describe</p>
                </div>
              </div>
              <div className="xl:w-1/3 mx-auto md:w-1/2 p-4">
                <div className="bg-gray-300 p-6 rounded-lg">
                  <img className="h-40 rounded w-full object-cover object-center mb-6" src="https://dummyimage.com/722x402" alt="content"/>
                  <h3 className="tracking-widest text-diluv-700 text-xs font-medium">SUBTITLE</h3>
                  <h2 className="text-xl text-gray-900 font-medium mb-4">Great Pyramid of Giza</h2>
                  <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison
                    bulbche.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    </Layout>
  );
}

