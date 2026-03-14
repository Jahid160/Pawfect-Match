import { getSingleFood } from "@/action/server/foods";
import FoodDetails from "@/Components/FoodDetails/FoodDetails";

const PetFoodDetailsPage = async ({ params }) => {
  const { id } = await params;

  const food = await getSingleFood(id);

  return <FoodDetails food={food} />;
};

export default PetFoodDetailsPage;