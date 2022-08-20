import "./css/home.css";
const Home = () => {
  return (
    <header className="header">
      <div>
        <a href="/ranking" className="homelink1 link">
          Ranking
        </a>
        <div></div>
        <a href="/voting/1/nolocalstorage" className="homelink2 link">
          Voting
        </a>
      </div>
    </header>
  );
};

export default Home;
