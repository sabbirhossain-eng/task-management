import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div>
      <section className="relative bg-[url(https://i.ibb.co/sbf7WqN/image.png)] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-[rgba(21, 21, 21, 0.00) 100%)]"></div>

        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Let us find your
              <strong className="block font-extrabold text-blue-400 mt-4">
                {" "}
                Task Manage{" "}
              </strong>
            </h1>
            <div className="mt-8 text-center">
              <Link to='/login'>
                <button className="btn btn-sm bg-black text-white p-2 rounded-md font-medium hover:bg-blue-400">Let’s Explore</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
