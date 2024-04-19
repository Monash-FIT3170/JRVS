import logo from '../../logo.svg';
import Navbar from '../../Components/navbar/Navbar';

function Home() {
  return (
    <div className="Home">
      <Navbar></Navbar>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/Home.js</code> and save to reload.
        </p>
      </header>


    </div>
  );
}

export default Home;
