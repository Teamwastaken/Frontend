import "./css/home.css";
const Home = () => {
  return (
    <header className="body">
      <h1 className="heading">Voice of SSG</h1>
      <div className="links">
        <button className="link orange">
          <a href="/voting/1/nolocalstorage"> Voting</a>
        </button>
        <button className="link blue">
          <a href="/ranking">Ranking</a>
        </button>
      </div>
    </header>
  );
};

export default Home;
