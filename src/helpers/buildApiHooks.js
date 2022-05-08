import React from "react";

/**
 * This function is used to fetch the base query for the API.
 */
export const fetchBaseQuery = ({ baseUrl, headers }) => {
  return async (query, options) => {
    return await fetch(`${baseUrl}${query}`, {
      ...options,
      headers: headers,
    });
  };
};

const enhancedispatch = (dispatch, data, item) => {
  dispatch({ type: item.name, payload: data });
};

/**
 * This function is used to build the API hooks.
 * @param {Array} apiActions - The API actions.
 * @param {Function} fetchBaseQuery - The function to fetch the base query.
 * @returns {Object} The API hooks.
 * @example
 * const hooks = buildApiHooks(
 *  [
 *   {
 *   name: "getWishlist",
 *  query: "/user/wishlist",
 * type: "query",
 * method: "GET",
 * },],
 * fetchBaseQuery({
 *  baseUrl: "http://localhost:3000/api",
 * headers: headers,
 * })
 * );
 *
 * const { useWishlist } = hooks;
 * */

export const buildHooks = (queryArray, baseQuery, dispatchFn) => {
  const hooks = {};
  queryArray.forEach((item) => {
    let hookName = `use${item.name}`;

    let useQuery = (urlParams = "") => {
      // using the reducer pattern
      const reducer = (state, action) => {
        if (action.type === "IS_LOADING") {
          return {
            ...state,
            loading: action.payload,
          };
        } else if (action.type === "HAS_ERROR") {
          return {
            ...state,
            error: action.payload,
          };
        } else if (action.type === "HAS_DATA") {
          return {
            ...state,
            data: action.payload,
          };
        }
      };
      const initialState = {
        data: null,
        loading: true,
        error: false,
      };
      const [state, dispatch] = React.useReducer(reducer, initialState);
      React.useEffect(() => {
        let componentMounted = false;
        baseQuery(`${item.query}/${urlParams}`)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            if (!componentMounted) {
              dispatch({ type: "HAS_DATA", payload: data });
              dispatch({ type: "IS_LOADING", payload: false });
              enhancedispatch(dispatchFn, data, item);
            }
          })
          .catch((err) => {
            dispatch({ type: "IS_LOADING", payload: false });
            dispatch({ type: "HAS_ERROR", payload: err });
          });
        return () => {
          dispatch({ type: "IS_LOADING", payload: false });
          componentMounted = true;
        };
      }, [dispatchFn, urlParams]);

      return { ...state };
    };

    let useMutation = (urlParams = "") => {
      const [loading, setLoading] = React.useState(false);
      const [error, setError] = React.useState(false);
      const [data, setData] = React.useState(null);

      let mutationCallBack = React.useCallback((body = {}, urlParams = "") => {
        setLoading(true);
        baseQuery(`${item.query}/${urlParams}`, {
          method: item.method,
          body: JSON.stringify(body),
        })
          .then((res) => {
            // console.log(res);
            return res.json();
          })
          .then((data) => {
            setData(data);
            setLoading(false);
            enhancedispatch(dispatchFn, data, item);
          })
          .catch((err) => {
            setLoading(false);
            // console.log(err);
            setError(err);
          });
      }, []);

      return [
        mutationCallBack,
        {
          loading,
          error,
          data,
        },
      ];
    };

    if (item.type === "query") {
      hooks[hookName] = useQuery;
    } else if (item.type === "mutation") {
      hooks[hookName] = useMutation;
    }
  });
  return hooks;
};
