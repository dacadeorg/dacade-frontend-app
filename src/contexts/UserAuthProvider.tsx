import { ReactNode, createContext, useEffect } from "react";
import { onAuthStateChanged, onIdTokenChanged } from "firebase/auth";
import { auth } from "@/config/firebase";
import { setAuthData } from "@/store/feature/auth.slice";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { fetchUser } from "@/store/services/user.service";
import { getToken } from "@/store/feature/user.slice";

const UserAuthContext = createContext(null);

export default function UserAuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    onIdTokenChanged(auth, async (user) => {
      dispatch(setAuthData(user));
      await dispatch(getToken());
    });

    onAuthStateChanged(auth, (user) => {
      dispatch(setAuthData(user));
      dispatch(fetchUser());
    });
  }, [dispatch]);

  return <UserAuthContext.Provider value={null}>{children}</UserAuthContext.Provider>;
}
