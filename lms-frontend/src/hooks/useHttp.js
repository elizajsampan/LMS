import { useMemo } from "react";
import axios from "axios";

function useHttp(baseURL = "http://localhost:8080/api") {
  const http = useMemo(
    () =>
      axios.create({
        baseURL,
      }),
    [baseURL]
  );

  return http;
}

export default useHttp;
