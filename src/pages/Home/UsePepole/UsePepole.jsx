import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

const UsePeople = () => {
  const [peopleData, setPeopleData] = useState([]);

  useEffect(() => {
    fetch("UsePepol.json")
      .then((res) => res.json())
      .then((data) => {
        setPeopleData(data.target_audience);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="mt-10 mb-10">
        <div className="text-center w-1/2 mx-auto">
            <h2 className="text-2xl font-semibold text-blue-400" data-aos="fade-up" data-aos-duration="3000">What type of people are using this website?</h2>
            <p className="text-gray-400" data-aos="fade-up" data-aos-duration="3000">In summary, the website caters to a broad spectrum of professionals and industries, offering a versatile task management platform to enhance productivity, organization, and collaboration within various settings</p>
        </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {peopleData?.map((pep) => (
          <div key={pep.id}>
            <Card className="mt-6 w-96 h-55" data-aos="fade-up" data-aos-duration="3000">
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {pep.profession}
                </Typography>
                <Typography>{pep.benefits.join(", ")}</Typography>
              </CardBody>
              <CardFooter className="pt-0"></CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsePeople;
