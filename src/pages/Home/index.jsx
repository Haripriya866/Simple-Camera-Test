import './index.css'

const Home=(props)=>{
    const handleStartTest = () => {
    props.history.push('/camera-test'); 
  };
    return(
        <>
            <div className="home-container">
                <h1 className='home-main-heading'>Camera Test App</h1>
                <button className="camera-test-button" onClick={handleStartTest}>
                Start Camera Test
                </button>
            </div>
        </>
    )
}

export default Home;
