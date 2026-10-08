import { createRoadmap } from "../service/ai.api";

export function useAi() {

  const handleCreateRoadmap = async (data) => {
    try {
      const response = await createRoadmap(data);
      console.log("Clg: ", response);

    } catch (error) {
      console.log(error);

      throw error
      console.log(error);
    }
  }

  return {handleCreateRoadmap };
}