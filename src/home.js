import "./css/home.css";
const Home = () => {
  return (
    <header className="body">
      <h1 className="heading">Voice of SSG</h1>

      <ul className="buttons">
        <li className="list-item">
          {" "}
          <a href="/voting/1" className="link">
            <button className="aButton">Voting</button>
          </a>
        </li>
        <li className="list-item">
          <a
            href="
          /ranking"
            className="link "
          >
            <button className="aButton orange">Ranking</button>
          </a>
        </li>
      </ul>
    </header>
  );
};

export default Home;
