const About = () => {
  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white" data-aos="fade-up" data-aos-duration="3000">
              Task Management
            </h2>
            <p className="mb-4" data-aos="fade-up" data-aos-duration="3000">
              <strong>Benefits of Effective Task Management:</strong>
            </p>
            <p>Increased Productivity: Stay organized and focused.</p>
            <p>Meeting Deadlines: Ensure tasks are completed on time.</p>
            <p>Enhanced Communication: Improve transparency within teams.</p>
            <p>Accountability: Promote accountability among team members.</p>
            <p>
              Strategic Decision-Making: Utilize analytics for informed
              decisions.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8" data-aos="fade-up" data-aos-duration="3000">
            <img
              className="w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
              alt="office content 1"
            />
            <img
              className="mt-4 w-full lg:mt-10 rounded-lg"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
              alt="office content 2"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
