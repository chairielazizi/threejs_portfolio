"use client";
import { useEffect, useState } from "react";
import Globe from "react-globe.gl";
import Button from "./Button";

const About = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [places, setPlaces] = useState([]);
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // load data
    fetch("/datasets/ne_110m_populated_places_simple.geojson")
      .then((res) => res.json())
      .then(({ features }) => setPlaces(features));
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("chairielazizi@gmail.com");
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 3000);
    // alert("Copied to clipboard");
  };

  return (
    <section className="my-20 c-space">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:grid-rows-6 gap-5 h-full">
        {/* about me */}
        <div className="col-span-1 xl:col-span-1 xl:row-span-3 ">
          <div className="grid-container justify-center items-center">
            <img
              src="/assets/grid1.png"
              alt="about-me"
              className="w-full h-fit object-contain sm:w-[276px]"
            />

            <div>
              <h2 className="grid-headtext">Hey! I&apos;m Chairiel</h2>
              <p className="grid-subtext">
                A highly motivated Software Developer with hands-on experience
                in developing web applications, using technologies such as Java,
                C#, ASP.NET, and PHP Laravel framework with Vue JS. Having a one
                year plus experience as a software test engineer, and now
                seeking a role in software development.
              </p>
            </div>
          </div>
        </div>

        {/* skills */}
        <div className="col-span-1 xl:col-span-1 xl:row-span-3">
          <div className="grid-container items-center">
            <img
              src="/assets/grid2.png"
              alt="skills"
              className="w-full h-fit object-contain sm:w-[276px]"
            />
            <div>
              <h2 className="grid-headtext">Skills</h2>
              <div className="flex flex-wrap gap-3">
                <p className="grid-subtext">Java</p>
                <p className="grid-subtext">C#</p>
                <p className="grid-subtext">ASP.NET</p>
                <p className="grid-subtext">PHP</p>
                <p className="grid-subtext">Laravel</p>
                <p className="grid-subtext">Vue JS</p>
                <p className="grid-subtext">SQL</p>
                <p className="grid-subtext">Git</p>
                <p className="grid-subtext">Jira</p>
              </div>
            </div>
          </div>
        </div>

        {/* location */}
        <div className="col-span-1 xl:col-span-1 xl:row-span-4">
          <div className="grid-container items-center">
            <div className="w-full h-fit flex justify-center items-center sm:h-[326px]">
              {isMounted && (
                <Globe
                  height={326}
                  width={326}
                  backgroundColor="rgba(0, 0, 0, 0)"
                  backgroundImageOpacity={0.5}
                  showAtmosphere={true}
                  showGraticules={false}
                  globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                  backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                  labelsData={places}
                  labelLat={(d) => d.properties.latitude}
                  labelLng={(d) => d.properties.longitude}
                  labelText={(d) => d.properties.name}
                  labelSize={(d) => Math.sqrt(d.properties.pop_max) * 4e-4}
                  labelDotRadius={(d) => Math.sqrt(d.properties.pop_max) * 4e-4}
                  labelColor={() => "rgba(255, 165, 0, 0.75)"}
                  labelResolution={2}
                />
              )}
            </div>
            <div className="text-center mt-5">
              <h2 className="grid-headtext">
                I work remotely across most timezone
              </h2>
              <p className="grid-subtext">Based in Malaysia, Truly Asia</p>
              <Button
                name="Contact me"
                isBeam={true}
                containerClass={"w-full mt-10"}
              />
            </div>
          </div>
        </div>

        {/* quote */}
        <div className="col-span-1 xl:col-span-2 xl:row-span-3">
          <div className="grid-container justify-center">
            <img
              src="/assets/grid3.png"
              alt="quote"
              className="w-full h-fit object-contain sm:h-[276px]"
            />
            <div>
              <h2 className="grid-headtext">Coding for passion</h2>
              <p className="grid-subtext">
                Coding use to be a chore, but now it&apos;s a passion. Coding
                everyday may energize me. As long it is not some bug reported by
                QAs
                <span className="waving-hand">🙃</span>.
              </p>
            </div>
          </div>
        </div>

        {/* contact */}
        <div className="col-span-1 xl:col-span-1 xl:row-span-2">
          <div className="grid-container items-center">
            <img
              src="/assets/grid4.png"
              alt="contact-me"
              className="w-full h-fit object-cover sm:h-[276px] md:h-[127px] sm:object-top"
            />
            <div className="space-y-2">
              <h2 className="grid-headtext">Contact me</h2>
              <div className="copy-container" onClick={handleCopy}>
                <img
                  src={hasCopied ? "assets/tick.svg" : "assets/copy.svg"}
                  alt="copy"
                />
                <p className="lg:text-2xl md:text-xl text-lg text-white">
                  chairielazizi@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
