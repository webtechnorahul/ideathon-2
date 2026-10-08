import { useDispatch } from 'react-redux';
import { register, login, me } from '../service/auth.api';
import { setUser, setLoading, setError } from '../state/auth.slice'
import { setRoadmaps } from '../../ai/state/ai.slice';
import { useAi } from '../../ai/hooks/useAi';
import { getRoadmaps } from '../../ai/service/ai.api';

export function useAuth() {
  const dispatch = useDispatch();
  

  const handleRegister = async ({ email, fullName, password }) => {
    try {
      const data = await register({ email, fullName, password });
      console.log("Clg: ", data);

    } catch (error) {
      console.log(error);

      throw error
      console.log(error);
    }
  }


  async function handleLogin({ email, password }) {
    try {
      const data = await login({ email, password });
      dispatch(setUser(data.user));
    } catch (error) {
      throw error;
    }
  }

  async function handleGetMe() {
    try {
      dispatch(setLoading(true));
      const data = await me();
      const roadmap = await getRoadmaps();

      console.log("Get ME", roadmap.roadmaps);
      dispatch(setUser(data.user));
      dispatch(setRoadmaps(roadmap.roadmaps));
      console.log(data.user);
    } catch (error) {
      dispatch(
        setError(error.response?.data.message || "Failed to fetch user data!"),
      );
    }
    finally {
      dispatch(setLoading(false));
    }
  }

  return { handleRegister, handleGetMe, handleLogin };
}