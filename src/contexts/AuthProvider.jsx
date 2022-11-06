import {
  createContext,
  useMemo,
  useCallback,
  useEffect,
  useState,
  useContext,
} from "react";
import { Buffer } from "buffer";
import config from "../config.json";
import * as usersApi from "../api/users";
import * as api from "../api";

const useAuth = () => useContext(AuthContext);

const JWT_TOKEN_KEY = config.token_key;
const AuthContext = createContext();

function parseJwt(token) {
  if (!token) return {};
  const base64Url = token.split(".")[1];
  const payload = Buffer.from(base64Url, "base64");
  const jsonPayload = payload.toString("ascii");
  return JSON.parse(jsonPayload);
}

function parseExp(exp) {
  if (!exp) return null;
  if (typeof exp !== "number") exp = Number(exp);
  if (isNaN(exp)) return null;
  return new Date(exp * 1000);
}

export const useSession = () => {
  const { loading, token, user, ready, error, hasAdminRole } = useAuth();
  return {
    loading,
    error,
    token,
    user,
    ready,
    isAuthed: Boolean(token),
    hasAdminRole,
  };
};

export const useLogin = () => {
  const { login } = useAuth();
  return login;
};

export const useLogout = () => {
  const { logout } = useAuth();
  return logout;
};

export const AuthProvider = ({ children }) => {
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState(localStorage.getItem(JWT_TOKEN_KEY));
  const [user, setUser] = useState(null);

  const setSession = useCallback(async (token, user) => {
    const { exp, userId } = parseJwt(token);
    const expiry = parseExp(exp);
    const stillValid = expiry >= new Date();

    if (stillValid) {
      localStorage.setItem(JWT_TOKEN_KEY, token);
    } else {
      // setError("Gelieve opnieuw in te loggen");
      localStorage.removeItem(JWT_TOKEN_KEY);
      token = null;
    }
    api.setAuthToken(token);
    setReady(stillValid);
    setToken(token);

    if (!user && stillValid) {
      user = await usersApi.getById(userId);
    }
    setUser(user);
  }, []);

  useEffect(() => {
    setSession(token, null);
  }, [token, setSession]);

  const login = useCallback(
    async (name, password) => {
      try {
        setLoading(false);
        setError("");
        const { token, user } = await usersApi.login(name, password);
        setSession(token, user);
        return true;
      } catch (error) {
        console.error(error);
        setError("Login mislukt, probeer het opnieuw");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [setSession]
  );

  const logout = useCallback(() => {
    setSession(null, null);
  }, [setSession]);

  const hasAdminRole = useCallback(() => {
    if (!user) return false;
    return user.roles.includes("admin");
  }, [user]);

  const value = useMemo(
    () => ({
      token,
      user,
      ready,
      error,
      loading,
      login,
      logout,
      hasAdminRole,
    }),
    [token, user, ready, error, loading, login, logout, hasAdminRole]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
