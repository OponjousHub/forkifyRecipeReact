import { Fragment } from "react";
import RecipeDatail from "./components/recipeDetails/recipeDetails";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/layout";
import AddRecipeForm from "./components/header/addRecipeForm";
import "./App.css";
import ErrorPage from "./pages/error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        // path: "/searchresults",
        // element: <Layout />,
        children: [{ path: ":recipeId", element: <RecipeDatail /> }],
      },
    ],
  },
]);

function App() {
  return (
    <Fragment>
      <RouterProvider router={router} />;
      <AddRecipeForm />
    </Fragment>
  );
}

export default App;
