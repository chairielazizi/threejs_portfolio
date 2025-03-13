const About = () => {
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
            <img
              src="/assets/grid3.png"
              alt="location"
              className="w-full h-fit object-contain sm:w-[376px]"
            />
            <div>
              <h2 className="grid-headtext">Location</h2>
              <p className="grid-subtext">Lagos, Nigeria</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
