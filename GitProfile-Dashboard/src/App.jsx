import Profile from "./Profile";
function App() {
  return (
    <div className="flex items-center justify-center flex-col">
      <header>
        <h1 className="font-extrabold text-3xl m-4">GitHub Profile</h1>
      </header>
      <Profile />
    </div>
  );
}

export default App;
