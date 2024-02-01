import { RecipeContextProvider } from "./store/recipeContext";
import Header from "./components/header/header";
import "./App.css";
import RecipeResult from "./components/results/recipeResult";
import RecipeDatail from "./components/recipeDetails/recipeDetails";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         // path: "/searchresults",
//         // element: <Layout />,
//         children: [{ path: ":recipeId", element: <RecipeDatail /> }],
//       },
//     ],
//   },
// ]);

function App() {
  return (
    <RecipeContextProvider>
      <div
        style={{
          backgroundColor: "#fef5f1",
          borderRadius: "24px",
          overflow: "hidden",
        }}
      >
        <Header />
        <div
          style={{
            display: "flex",
          }}
        >
          <RecipeResult />
          <RecipeDatail />
        </div>
      </div>
    </RecipeContextProvider>
  );
}

export default App;
