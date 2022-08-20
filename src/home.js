import "./css/home.css";
const Home = () => {
  return (
    <header className="body">
      <h1 className="heading">Voice of SSG</h1>
      <div className="links">
        <button href="/voting/1/nolocalstorage" className="link orange">
          Voting
        </button>
        <button href="/ranking" className="link blue">
          Ranking
        </button>
      </div>
    </header>
  );
};

export default Home;
