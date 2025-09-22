import HomeFive from "@/components/homes/home-five";
import HomeOne from "@/components/homes/home-one";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Tourex - Tour & Travel Booking React Next js Template",
};
const page = () => {
  return (
    <Wrapper>
      <HomeFive />
    </Wrapper>
  )
}

export default page